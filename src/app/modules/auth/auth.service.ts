import { StatusCodes } from 'http-status-codes'
import API_Error from '../../errors/ApiError'
import { User } from '../users/models'
import {
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from './auth.interface'
import { jwtHelpers } from '../../helper/jwtHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const loginUserFromDB = async (
  payload: ILoginUser
): Promise<ILoginResponse> => {
  const { id, password } = payload

  //user check using static
  const isUserExist = await User.isUserExist(id)

  if (!isUserExist) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'User does not exist')
  }

  // Match Password
  const isPasswordMatch = await User.isPasswordMatch(
    password,
    isUserExist.password
  )
  if (!isPasswordMatch) {
    throw new API_Error(StatusCodes.UNAUTHORIZED, 'Password is incorrect')
  }

  const { id: userId, role, needsPasswordChange } = isUserExist
  // create access token
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret_token as Secret,
    config.jwt.expire_in as string
  )
  // create refreshToken
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expire_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token as Secret
    )
  } catch (error) {
    throw new API_Error(StatusCodes.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { userId } = verifiedToken

  // check user to database
  const isUserExist = await User.isUserExist(userId)
  if (!isUserExist) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'User does not exist')
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    { userId: isUserExist.id, role: isUserExist.role },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expire_in as string
  )
  return {
    accessToken: newAccessToken,
  }
}
export const AuthService = {
  loginUserFromDB,
  refreshToken,
}
