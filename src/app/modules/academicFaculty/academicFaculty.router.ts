import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'
import validateRequest from '../../middelewres/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'
const router = express.Router()

router.delete('/:id', AcademicFacultyController.deleteFaculty)
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.patchFaculty
)
router.get('/:id', AcademicFacultyController.getSingleFaculty)
router.get('/', AcademicFacultyController.getAllFaculty)
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
)
export const AcademicFacultyRoute = router
