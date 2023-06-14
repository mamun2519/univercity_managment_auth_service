import { Model } from 'mongoose'
// Crate enastan
export type IManagementDepartment = {
  title: string
}

// crate custom method
export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>

export type IManagementDepartmentFilters = {
  searchTerm: string
  title: string
}
