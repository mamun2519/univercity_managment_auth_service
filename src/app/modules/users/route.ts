import express from 'express'
import { UserController } from './controller'
import validateRequest from '../../middelewres/validateRequest'
import { UserValidation } from './validation'
import { FacultyValidation } from '../faculty/faculty.validation'
const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)
// create faculty

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  UserController.createFaculty
)

// crate admin
export const UserRoutes = router
