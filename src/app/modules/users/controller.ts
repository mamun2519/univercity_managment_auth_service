import { Request, Response } from 'express'
import { UserService } from './service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { StatusCodes } from 'http-status-codes'
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body

  const result = await UserService.createStudent(student, userData)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user create successfully!',
    data: result,
  })
})

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body
  const result = await UserService.createFaculty(faculty, userData)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'faculty create successfully',
    data: result,
  })
})

export const UserController = { createStudent, createFaculty }
