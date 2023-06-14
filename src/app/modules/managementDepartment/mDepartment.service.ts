import { SortOrder } from 'mongoose'
import { PaginationHelper } from '../../helper/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'

import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './MDepartment.interface'
import { ManagementDepartment } from './MDepartment.model'
import { departmentManagementFilterFiled } from './mDepartment.constant'

const createDepartmentToDB = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const faculty = await ManagementDepartment.create(payload)

  return faculty
}

const getAllManagementDepartmentToDB = async (
  paginationOption: IPaginationOptions,
  filters: IManagementDepartmentFilters
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOption)

  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  // Searching
  if (searchTerm) {
    andConditions.push({
      $or: departmentManagementFilterFiled.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  // FILTERING
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filters).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // Sorting
  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  // where conditions
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await ManagementDepartment.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleManagementDepartmentToDB = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id)
  return result
}

const deleteManagementDepartmentToDB = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id)
  return result
}

const updateManagementDepartmentToDB = async (
  id: string,
  payload: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const ManagementDepartmentService = {
  createDepartmentToDB,
  getAllManagementDepartmentToDB,
  getSingleManagementDepartmentToDB,
  deleteManagementDepartmentToDB,
  updateManagementDepartmentToDB,
}
