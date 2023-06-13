import express from 'express'
import { StudentController } from './student.controller'
import validateRequest from '../../middelewres/validateRequest'
import { StudentValidation } from './student.validation'
const router = express.Router()

router.get('/:id', StudentController.getSingleStudent)
router.get('/', StudentController.getStudent)
router.delete('/:id', StudentController.deleteStudent)
router.patch(
  '/:id',
  validateRequest(StudentValidation.StudentUpdateZodSchema),
  StudentController.updateStudent
)

export const StudentRoute = router
