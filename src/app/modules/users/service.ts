import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './interface'
import { User } from './models'
import { generateStudentId } from './utils'
import { Student } from '../student/student.model'
import API_Error from '../../errors/ApiError'
import { StatusCodes } from 'http-status-codes'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // DEFAULT PASSWORD SET
  if (!user.password) {
    user.password = config.student_default_pass as string
  }
  // SET USER ROLL IN OUR BACKEND
  user.role = 'student'

  // FIND ACADEMIC SEMESTER THEN GENERATE ID
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  let newUserAllData = null
  // TRANSACTION OR ROLLBACK OPERATION
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // GENERATE STUDENT ID
    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id

    // create student
    const newStudent = await Student.create([student], { session })
    if (!newStudent.length) {
      throw new API_Error(StatusCodes.BAD_REQUEST, 'Failed To create student')
    }
    // set student _id into user
    user.student = newStudent[0]._id

    // create user
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new API_Error(StatusCodes.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    // close this session
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    await session.endSession()
    throw new API_Error(StatusCodes.BAD_REQUEST, 'Something is wrong!')
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicFaculty' },
        { path: 'academicDepartment' },
        { path: 'academicSemester' },
      ],
    })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
}
