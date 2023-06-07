import express from 'express'
import { UserController } from './controller'
import validateRequest from '../../middelewres/validateRequest'
import { UserValidation } from './validation'
const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)

export const UserRoutes = router
