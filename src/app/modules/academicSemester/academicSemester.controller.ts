import { Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'
import { StatusCodes } from 'http-status-codes'
import pick from '../../../shared/pick'
import { paginationFields } from '../../constains/pagination'
import { academicSemesterFilterEavbleFiled } from './academicSemester.constant'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body
  const semester = await AcademicSemesterService.createSemester(
    academicSemesterData
  )

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester is crated successfully!',
    data: semester,
  })
})

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  //SEARCH AND FILTERS
  const filters: any = pick(req.query, academicSemesterFilterEavbleFiled)

  //PAGINATION
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester get Successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicSemesterService.singleSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester get Successfully!',
    data: result,
  })
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  const result = await AcademicSemesterService.updateSemester(id, updatedData)
  sendResponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: 'Semester update Successfully!',
    data: result,
  })
})

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicSemesterService.deleteSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: 'Semester delete Successfully!',
    data: result,
  })
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
