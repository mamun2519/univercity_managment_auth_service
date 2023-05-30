import { Request, Response } from 'express'
import userService from './service'
const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res
      .status(200)
      .json({ success: true, message: 'user create success', user: result })
  } catch (e) {
    console.log(e)
  }
}

export default {
  createUser,
}
