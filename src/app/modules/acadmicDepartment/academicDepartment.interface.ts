import { Model, Schema } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type IAcademicDepartment = {
  title: string
  academicFaculty: Schema.Types.ObjectId | IAcademicFaculty
}

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>

export type IAcademicDepartmentFilters = {
  searchTerm: string
  title: string
  academicFaculty: string
}
