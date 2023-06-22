import { NextFunction, Request, Response } from 'express'
import API_Error from '../errors/ApiError'
import { StatusCodes } from 'http-status-codes'
import { jwtHelpers } from '../helper/jwtHelper'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const auth =
  (...requiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new API_Error(StatusCodes.UNAUTHORIZED, 'You are not authorized')
      }
      let verifiedUser = null

      verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret_token as Secret
      )
      req.user = verifiedUser
      //check role
      if (!requiredRole.includes(verifiedUser.role)) {
        throw new API_Error(StatusCodes.FORBIDDEN, 'forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
