import express from 'express'
import { DepartmentController } from './adamicDerpartment.controler'
import validateRequest from '../../middelewres/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
const router = express.Router()

router.get('/:id', DepartmentController.singleDepartment)
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  DepartmentController.patchDepartment
)
router.delete('/:id', DepartmentController.deleteDepartment)
router.get('/', DepartmentController.getAllDepartment)
router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  DepartmentController.createDepartment
)

export const DepartmentRoute = router
