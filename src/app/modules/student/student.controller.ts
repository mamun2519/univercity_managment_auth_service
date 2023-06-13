import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { studentFilterAbleFiled } from './student.constant'
import { paginationFields } from '../../constains/pagination'
import sendResponse from '../../../shared/sendResponse'
import { IStudent } from './student.interface'
import { StatusCodes } from 'http-status-codes'
import { StudentService } from './student.service'

const getStudent = catchAsync(async (req: Request, res: Response) => {
  //SEARCH AND FILTERS
  const filters: any = pick(req.query, studentFilterAbleFiled)

  //PAGINATION
  const paginationOptions = pick(req.query, paginationFields)
  const result = await StudentService.getStudentToDb(filters, paginationOptions)

  sendResponse<IStudent[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student get Successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await StudentService.getSingleStudentToDb(id)
  sendResponse<IStudent>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student get Successfully!',
    data: result,
  })
})
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await StudentService.deleteStudentFromDb(id)
  sendResponse<IStudent>(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: 'Student delete Successfully!',
    data: result,
  })
})

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(id)
  const { ...updatedData } = req.body
  const result = await StudentService.updateStudentToDB(id, updatedData)
  sendResponse<IStudent>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student update Successfully!',
    data: result,
  })
})

export const StudentController = {
  getSingleStudent,
  getStudent,
  deleteStudent,
  updateStudent,
}
