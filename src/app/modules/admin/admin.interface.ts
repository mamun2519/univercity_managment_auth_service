import { Model, Types } from 'mongoose'
import { IManagementDepartment } from '../managementDepartment/MDepartment.interface'

export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}

export type IAdmin = {
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
  managementDepartment: Types.ObjectId | IManagementDepartment
}
export type AdminModel = Model<IAdmin, Record<string, unknown>>

export type IAdminFilters = {
  searchTerm: string
  id: string
  email: string
  contactNo: string
  bloodGroup: string
  emergencyContactNo: string
}
