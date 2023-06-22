/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IFaculty } from '../faculty/faculty.interface'
import { IAdmin } from '../admin/admin.interface'

export type IUser = {
  id: string
  role: string
  password: string
  needsPasswordChange: boolean
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IFaculty
  admin?: Types.ObjectId | IAdmin
}
// export type IUserMethods = {
//   // eslint-disable-next-line no-unused-vars
//   fullName(id: string): Promise<IUser>

// export type UserModel = Model<IUser, object, IUserMethods>
// }

// create a Static
export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange' | 'role'>>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
