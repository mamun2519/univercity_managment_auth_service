import { NextFunction, Request, Response } from 'express'
import { UserService } from './service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    console.log(user)
    const result = await UserService.createUser(user)
    next()
    // res
    //   .status(200)
    //   .json({ success: true, message: 'user create success', user: result })
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'user create successfully!',
      data: result,
    })
  }
)

export const UserController = { createUser }
