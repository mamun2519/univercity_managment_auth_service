import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './interface'
import { User } from './models'
import { generateAdminId, generateFacultyId, generateStudentId } from './utils'
import { Student } from '../student/student.model'
import API_Error from '../../errors/ApiError'
import { StatusCodes } from 'http-status-codes'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

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

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // SET DEFAULT
  if (!user.password) {
    user.password = config.faculty_default_pass as string
  }
  // set role
  user.role = 'faculty'
  // generate id

  const session = await mongoose.startSession()
  let userData = null
  try {
    session.startTransaction()
    const id = await generateFacultyId()

    // set id
    user.id = id
    faculty.id = id

    // create faculty
    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new API_Error(StatusCodes.BAD_REQUEST, 'Failed To create Faculty')
    }

    // set ref id faculty
    user.faculty = newFaculty[0]._id

    // create user
    const newUser = await User.create([user], { session })
    console.log(newUser)
    if (!newUser.length) {
      throw new API_Error(StatusCodes.BAD_REQUEST, 'Failed To create User')
    }
    userData = newUser[0]

    // close this session
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    await session.endSession()
    throw new API_Error(StatusCodes.BAD_REQUEST, 'Transation faild!')
  }

  if (userData) {
    userData = await User.findOne({ id: userData.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicFaculty' }, { path: 'academicDepartment' }],
    })
  }
  return userData
}

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.admin_default_pass as string
  }
  user.role = 'admin'

  let createdUser = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateAdminId()
    console.log(id)
    user.id = id
    admin.id = id

    const createAdmin = await Admin.create([admin], { session })
    if (!createAdmin.length) {
      throw new API_Error(StatusCodes.BAD_REQUEST, 'failed to crate admin')
    }
    const createUser = await User.create([user], { session })
    if (!createUser.length) {
      throw new API_Error(StatusCodes.BAD_REQUEST, 'failed to crate admin')
    }
    createdUser = createUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    await session.endSession()
    throw new API_Error(
      StatusCodes.BAD_REQUEST,
      'Transaction failed, Something is wrong!'
    )
  }
  if (createdUser) {
    createdUser = await User.findOne({ id: createdUser.id }).populate(
      'managementDepartment'
    )
  }

  return createdUser
}
export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
}
