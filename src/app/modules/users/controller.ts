import { NextFunction, Request, Response } from 'express'
import { UserService } from './service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    const result = await UserService.createUser(user)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'user create successfully!',
      data: result,
    })
    next()
  }
)

export const UserController = { createUser }
