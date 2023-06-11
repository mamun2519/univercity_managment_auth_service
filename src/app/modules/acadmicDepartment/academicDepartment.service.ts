import { SortOrder } from 'mongoose'
import { PaginationHelper } from '../../helper/paginationHelper'
import { IPaginationOptions } from '../../interfaces/pagination'
import { academicDepartmentSearchFiled } from './academicDepartment.consten'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createDepartmentToDb = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  )
  return result
}

const getAllDepartmentToDb = async (
  filters: IAcademicDepartmentFilters,
  paginationOption: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOption)
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  // Searching
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchFiled.map(field => ({
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
  const result = await AcademicDepartment.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty')
  const total = await AcademicDepartment.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const singleDepartmentToDb = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  )
  return result
}
const patchDepartmentToDb = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('academicFaculty')
  return result
}
const deleteDepartmentToDb = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id).populate(
    'academicFaculty'
  )
  return result
}

export const DepartmentService = {
  createDepartmentToDb,
  getAllDepartmentToDb,
  singleDepartmentToDb,
  patchDepartmentToDb,
  deleteDepartmentToDb,
}
