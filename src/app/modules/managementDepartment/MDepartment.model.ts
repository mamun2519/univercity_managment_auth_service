import { Schema, model } from 'mongoose'
import {
  IManagementDepartment,
  ManagementDepartmentModel,
} from './MDepartment.interface'

const managementDepartmentSchema = new Schema<
  IManagementDepartment,
  ManagementDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { versionKey: true },
  }
)

export const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentModel
>('DepartmentManagement', managementDepartmentSchema)
