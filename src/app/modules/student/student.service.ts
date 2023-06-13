import { SortOrder } from 'mongoose'
import { PaginationHelper } from '../../helper/paginationHelper'
import { IPaginationOptions } from '../../interfaces/pagination'
import { studentSearchFiled } from './student.constant'
import { IStudent, IStudentFilters } from './student.interface'
import { Student } from './student.model'
import { IGenericResponse } from '../../interfaces/common'
import API_Error from '../../errors/ApiError'
import { StatusCodes } from 'http-status-codes'

const getStudentToDb = async (
  filters: IStudentFilters,
  paginationOption: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOption)
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  // Searching
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchFiled.map(field => ({
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
  const result = await Student.find(whereConditions)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Student.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleStudentToDb = async (id: string): Promise<IStudent | null> => {
  const student = await Student.findById(id)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
  return student
}

const deleteStudentFromDb = async (id: string): Promise<IStudent | null> => {
  const student = await Student.findByIdAndDelete(id)
  return student
}
const updateStudentToDB = async (
  id: string,
  payload: IStudent
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id })

  if (!isExist) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'Student not found')
  }

  const { name, guardian, localGuardian, ...studentData } = payload
  const updatedStudentData: Partial<IStudent> = { ...studentData }

  // handle dynamically name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>
      ;(updatedStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  // handle dynamically  guardian
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>
      ;(updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }
  // handle dynamically localGuardian
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(name).forEach(key => {
      const localGuardianKey = `name.${key}` as keyof Partial<IStudent>
      ;(updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  })
  console.log(result)
  return result
}
export const StudentService = {
  getSingleStudentToDb,
  getStudentToDb,
  deleteStudentFromDb,
  updateStudentToDB,
}
