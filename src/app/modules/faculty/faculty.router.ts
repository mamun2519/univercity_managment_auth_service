import express from 'express'
import { FacultyController } from './faculty.controller'
import validateRequest from '../../middelewres/validateRequest'
import { FacultyValidation } from './faculty.validation'
const router = express.Router()

router.get('/:id', FacultyController.getSingleFaculty)
router.patch(
  '/:id',
  validateRequest(FacultyValidation.facultyUpdateZodSchema),
  FacultyController.updateFaculty
)
router.delete('/:id', FacultyController.deleteFaculty)
router.get('/', FacultyController.getAllFaculty)

export const FacultyRoute = router
