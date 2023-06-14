import mongoose, { SortOrder } from 'mongoose'
import { PaginationHelper } from '../../helper/paginationHelper'
import { IPaginationOptions } from '../../interfaces/pagination'
import { facultySearchFiled } from './faculty.constant'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import { Faculty } from './faculty.model'
import { IGenericResponse } from '../../interfaces/common'
import API_Error from '../../errors/ApiError'
import { StatusCodes } from 'http-status-codes'
import { User } from '../users/models'

const getAllFacultyFromDB = async (
  filters: IFacultyFilters,
  paginationOption: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { limit, sortBy, sortOrder, skip, page } =
    PaginationHelper.calculatePagination(paginationOption)
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  // Searching
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchFiled.map(field => ({
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
  const result = await Faculty.find(whereConditions)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Faculty.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFacultyFromDB = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicFaculty')
    .populate('academicDepartment')
  return result
}
const updateFacultyFromDB = async (
  id: string,
  payload: IFaculty
): Promise<IFaculty | null> => {
  const isExistFaculty = await Faculty.findOne({ id })
  if (!isExistFaculty) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'Faculty not found!')
  }
  const { name, ...facultyData } = payload
  const updatedFacultyObject: Partial<IFaculty> = { ...facultyData }
  // handle dynamically name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>
      ;(updatedFacultyObject as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyObject, {
    new: true,
  })
    .populate('academicFaculty')
    .populate('academicDepartment')

  return result
}
const deleteFacultyFromDB = async (id: string) => {
  const user = await User.findOne({ id })

  const faculty = await Faculty.findOne({ id })

  if (!user || !faculty) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'Faculty not found')
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    await User.findOneAndDelete({ id })
    await Faculty.findOneAndDelete({ id })
      .populate('academicFaculty')
      .populate('academicDepartment')
    session.commitTransaction()
    session.endSession()
    return faculty
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new API_Error(
      StatusCodes.BAD_REQUEST,
      'transaction failed, Something is wrong!'
    )
  }
}
export const FacultyService = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyFromDB,
  deleteFacultyFromDB,
}
