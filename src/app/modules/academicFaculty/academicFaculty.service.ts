import { SortOrder } from 'mongoose'
import { PaginationHelper } from '../../helper/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'
import { academicFacultySearchFiled } from './academicFaculty.constant'

const createFacultyToDB = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const faculty = await AcademicFaculty.create(payload)

  return faculty
}

const getAllFacultyToDB = async (
  paginationOption: IPaginationOptions,
  filters: IAcademicFacultyFilters
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOption)

  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  // Searching
  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchFiled.map(field => ({
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
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFacultyToDB = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const deleteFacultyToDB = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}

const patchFacultyToDB = async (
  id: string,
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const FacultyService = {
  createFacultyToDB,
  getAllFacultyToDB,
  getSingleFacultyToDB,
  deleteFacultyToDB,
  patchFacultyToDB,
}
