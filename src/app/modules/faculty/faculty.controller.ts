import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { facultyFilterAbleFiled } from './faculty.constant'
import { paginationFields } from '../../constains/pagination'
import { FacultyService } from './faculty.service'
import sendResponse from '../../../shared/sendResponse'
import { IFaculty } from './faculty.interface'
import { StatusCodes } from 'http-status-codes'

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters: any = pick(req.query, facultyFilterAbleFiled)
  const paginationOption = pick(req.query, paginationFields)
  const result = await FacultyService.getAllFacultyFromDB(
    filters,
    paginationOption
  )
  sendResponse<IFaculty[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty get Successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.getSingleFacultyFromDB(id)
  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty get Successfully!',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...updatedData } = req.body
  const result = await FacultyService.updateFacultyFromDB(id, updatedData)
  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty update Successfully!',
    data: result,
  })
})
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.deleteFacultyFromDB(id)
  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'faculty delete successfully!',
    data: result,
  })
})

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
