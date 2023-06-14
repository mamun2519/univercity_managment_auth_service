import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'
import { IAcademicDepartment } from '../acadmicDepartment/academicDepartment.interface'

export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}

export type IFaculty = {
  id: string
  name: UserName
  gender: 'male' | 'female'
  contactNo: string
  email: string
  dateOfBirth: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'AB+' | 'AB-' | 'O+' | 'O-'
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  designation: string
  profileImage: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
  academicDepartment: Types.ObjectId | IAcademicDepartment
}
export type FacultyModel = Model<IFaculty, Record<string, unknown>>

export type IFacultyFilters = {
  searchTerm: string
  id: string
  email: string
  contactNo: string
  bloodGroup: string
  emergencyContactNo: string
}
