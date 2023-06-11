import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicFaculty } from './academicFaculty.interface'
import { FacultyService } from './academicFaculty.service'
import pick from '../../../shared/pick'
import { paginationFields } from '../../constains/pagination'
import { StatusCodes } from 'http-status-codes'
import { academicFacultyFilterFiled } from './academicFaculty.constant'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body
  const result = await FacultyService.createFacultyToDB(facultyData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty is crated successfully!',
    data: result,
  })
})

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filters: any = pick(req.query, academicFacultyFilterFiled)
  const result = await FacultyService.getAllFacultyToDB(
    paginationOptions,
    filters
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty get Successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.getSingleFacultyToDB(id)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty get Successfully!',
    data: result,
  })
})

const patchFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...patchData } = req.body
  const result = await FacultyService.patchFacultyToDB(id, patchData)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty update Successfully!',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.deleteFacultyToDB(id)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty delete Successfully!',
    data: result,
  })
})

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  patchFaculty,
  deleteFaculty,
}
