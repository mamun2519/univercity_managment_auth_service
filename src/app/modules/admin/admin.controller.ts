import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { adminFilterAbleFiled } from './admin.constant'
import { paginationFields } from '../../constains/pagination'
import sendResponse from '../../../shared/sendResponse'
import { IAdmin } from './admin.interface'
import { StatusCodes } from 'http-status-codes'
import { AdminService } from './admin.service'

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters: any = pick(req.query, adminFilterAbleFiled)
  const paginationOption = pick(req.query, paginationFields)
  const result = await AdminService.getAllAdminFromDB(filters, paginationOption)
  sendResponse<IAdmin[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'admin get Successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AdminService.getSingleAdminFromDB(id)
  sendResponse<IAdmin>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'admin get Successfully!',
    data: result,
  })
})
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...updatedData } = req.body
  const result = await AdminService.updateAdminFromDB(id, updatedData)
  sendResponse<IAdmin>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'admin update Successfully!',
    data: result,
  })
})
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AdminService.deleteAdminFromDB(id)
  sendResponse<IAdmin>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'admin deleted Successfully!',
    data: result,
  })
})

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
