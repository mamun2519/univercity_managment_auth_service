import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { IAcademicDepartment } from '../acadmicDepartment/academicDepartment.interface'

export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}

export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  motherName: string
  address: string
}

export type IStudent = {
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
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImage: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicSemester: Types.ObjectId | IAcademicSemester
}
export type StudentModel = Model<IStudent, Record<string, unknown>>

export type IStudentFilters = {
  searchTerm: string
  id: string
  email: string
  contactNo: string
  bloodGroup: string
  emergencyContactNo: string
}
