import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IManagementDepartment } from './MDepartment.interface'
import { StatusCodes } from 'http-status-codes'
import { ManagementDepartmentService } from './mDepartment.service'
import pick from '../../../shared/pick'
import { paginationFields } from '../../constains/pagination'
import { departmentManagementFilterFiled } from './mDepartment.constant'

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...DepartmentData } = req.body
    const result = await ManagementDepartmentService.createDepartmentToDB(
      DepartmentData
    )

    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'Management department is crated successfully!',
      data: result,
    })
  }
)
const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields)
    const filters: any = pick(req.query, departmentManagementFilterFiled)
    const result =
      await ManagementDepartmentService.getAllManagementDepartmentToDB(
        paginationOptions,
        filters
      )
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management Department  get Successfully!',
      meta: result.meta,
      data: result.data,
    })
  }
)
const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await ManagementDepartmentService.getSingleManagementDepartmentToDB(id)
    sendResponse<IManagementDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management Department get Successfully!',
      data: result,
    })
  }
)
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { ...patchData } = req.body
    const result =
      await ManagementDepartmentService.updateManagementDepartmentToDB(
        id,
        patchData
      )
    sendResponse<IManagementDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management Department  update Successfully!',
      data: result,
    })
  }
)
const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await ManagementDepartmentService.deleteManagementDepartmentToDB(id)
    sendResponse<IManagementDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Management Department delete Successfully!',
      data: result,
    })
  }
)

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  updateManagementDepartment,
  getSingleManagementDepartment,
  deleteManagementDepartment,
}
