import { StatusCodes } from 'http-status-codes'
import API_Error from '../../errors/ApiError'
import {
  academicSemesterSearchFiled,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IGenericResponse } from '../../interfaces/common'
import { PaginationHelper } from '../../helper/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  //Match semester code
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new API_Error(StatusCodes.BAD_REQUEST, 'Invalid Semester code!')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOption: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOption)
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  // Searching
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchFiled.map(field => ({
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
  const result = await AcademicSemester.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const singleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const semester = await AcademicSemester.findById(id)
  return semester
}

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  //Match semester code
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new API_Error(StatusCodes.BAD_REQUEST, 'Invalid Semester code!')
  }
  const semester = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return semester
}
const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  singleSemester,
  updateSemester,
  deleteSemester,
}
