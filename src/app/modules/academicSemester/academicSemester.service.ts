import { StatusCodes } from 'http-status-codes'
import API_Error from '../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

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

export const AcademicSemesterService = {
  createSemester,
}
