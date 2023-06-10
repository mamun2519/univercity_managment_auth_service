import express from 'express'
import validateRequest from '../../middelewres/validateRequest'
import { AcademicSemesterValidation } from './academicSemesterValidation'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()
router.delete('/:id', AcademicSemesterController.deleteSemester)
router.get('/:id', AcademicSemesterController.getSingleSemester)

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
)
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)
router.get('/', AcademicSemesterController.getAllSemester)

export const SemesterRoute = router
