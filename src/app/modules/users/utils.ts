import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './models'
// student
export async function findLastStudentId(): Promise<string | undefined> {
  const lastUser = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  //   LEAN CONVERT TO PURE JAVASCRIPT OBJECT
  return lastUser?.id ? lastUser.id.substring(4) : undefined
}
export async function generateStudentId(
  academicSemester: IAcademicSemester | null
): Promise<string> {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0') // 00000
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0') //0000
  // add student year or code in user roll 25015000
  incrementId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementId}`

  return incrementId
}

// faculty
export async function findLastFacultyId(): Promise<string | undefined> {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  //   LEAN CONVERT TO PURE JAVASCRIPT OBJECT
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

export async function generateFacultyId(): Promise<string | undefined> {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0') // 00000
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0') //0000
  // add student $year or code in user roll 25015000
  incrementId = `F-${incrementId}`
  return incrementId
}
