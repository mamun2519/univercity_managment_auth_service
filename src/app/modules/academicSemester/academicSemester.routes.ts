import express from 'express'
import validateRequest from '../../middelewres/validateRequest'
import { AcademicSemesterValidation } from './academicSemesterValidation'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)

export const SemesterRoute = router
