import express from 'express'
import { UserController } from './controller'
import validateRequest from '../../middelewres/validateRequest'
import { UserValidation } from './validation'
const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)
// create faculty

// crate admin
export const UserRoutes = router
