import config from '../../../config'
import { IUser } from './interface'
import { User } from './models'
import { generateUserId } from './utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // NEED TO AUTO GENERATED ID
  const id = await generateUserId()
  user.id = id

  // DEFAULT PASSWORD SET
  if (!user.password) {
    user.password = config.user_default_pass as string
  }

  const createUser = await User.create(user)
  if (!createUser) {
    throw new Error('Failed to create user')
  }
  return createUser
}

export const UserService = {
  createUser,
}
