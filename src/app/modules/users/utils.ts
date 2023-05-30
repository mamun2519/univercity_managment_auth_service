import { User } from './models'

export async function findLastUserId() {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  //   LEAN CONVERT TO PURE JAVASCRIPT OBJECT
  return lastUser?.id
}

export async function generateUserId() {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0') // 00000
  const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0') //0000
  return incrementId
}
