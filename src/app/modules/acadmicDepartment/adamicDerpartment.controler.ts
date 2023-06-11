import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { DepartmentService } from './academicDepartment.service'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../constains/pagination'
import { academicDepartmentFilterEavbleFiled } from './academicDepartment.consten'
import { StatusCodes } from 'http-status-codes'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...DepartmentData } = req.body

  const result = await DepartmentService.createDepartmentToDb(DepartmentData)
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department is crated successfully!',
    data: result,
  })
})
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  //SEARCH AND FILTERS
  const filters: any = pick(req.query, academicDepartmentFilterEavbleFiled)

  const result = await DepartmentService.getAllDepartmentToDb(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Department get Successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const singleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await DepartmentService.singleDepartmentToDb(id)
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department get successfully!',
    data: result,
  })
})
const patchDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...updateData } = req.body
  const result = await DepartmentService.patchDepartmentToDb(id, updateData)
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department update successfully!',
    data: result,
  })
})
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await DepartmentService.deleteDepartmentToDb(id)
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department Delete successfully!',
    data: result,
  })
})

export const DepartmentController = {
  createDepartment,
  getAllDepartment,
  singleDepartment,
  patchDepartment,
  deleteDepartment,
}
