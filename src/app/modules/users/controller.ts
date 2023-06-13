import { Request, Response } from 'express'
import { UserService } from './service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body

  const result = await UserService.createStudent(student, userData)
  console.log(result)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user create successfully!',
    data: result,
  })
})

export const UserController = { createStudent }
