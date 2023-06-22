export type ILoginResponse = {
  accessToken: string
  refreshToken?: string
  needsPasswordChange: boolean
}

export type ILoginUser = {
  id: string
  password: string
}

export type IRefreshTokenResponse = {
  accessToken: string
}
