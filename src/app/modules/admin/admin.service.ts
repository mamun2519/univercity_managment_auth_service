import mongoose, { SortOrder } from 'mongoose'
import { PaginationHelper } from '../../helper/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import { adminSearchFiled } from './admin.constant'
import { IAdmin, IAdminFilters } from './admin.interface'
import { Admin } from './admin.model'
import API_Error from '../../errors/ApiError'
import { StatusCodes } from 'http-status-codes'
import { User } from '../users/models'

const getAllAdminFromDB = async (
  filters: IAdminFilters,
  paginationOption: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOption)
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  // Searching
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchFiled.map(field => ({
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
  const result = await Admin.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Admin.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleAdminFromDB = async (id: string): Promise<IAdmin | null> => {
  const admin = await Admin.findById(id)
  if (!admin) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'Admin Not found')
  }

  return admin
}

const updateAdminFromDB = async (
  id: string,
  payload: IAdmin
): Promise<IAdmin | null> => {
  console.log(id)
  const existAdmin = await Admin.findOne({ id })
  console.log(existAdmin)
  if (!existAdmin) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'Admin Not found!')
  }
  const { name, ...AdminData } = payload
  const updatedAdminObject: Partial<IAdmin> = { ...AdminData }
  // handle dynamically name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>
      ;(updatedAdminObject as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminObject, {
    new: true,
  })
  return result
}

const deleteAdminFromDB = async (id: string): Promise<IAdmin | null> => {
  const user = await User.findOne({ id })
  const admin = await Admin.findOne({ id })
  if (!user || !admin) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'Admin Not found!')
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    await User.findOneAndDelete({ id })
    await Admin.findOneAndDelete({ id })
    await session.commitTransaction()
    await session.endSession()
    return admin
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new API_Error(
      StatusCodes.BAD_REQUEST,
      'transaction failed, Something is wrong!'
    )
  }
}
export const AdminService = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminFromDB,
  deleteAdminFromDB,
}
