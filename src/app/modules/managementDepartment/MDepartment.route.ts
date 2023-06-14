import express from 'express'
import { ManagementDepartmentController } from './mDepartment.controller'
import validateRequest from '../../middelewres/validateRequest'
import { DepartmentManagementValidation } from './mManagemnt.validation'
const router = express.Router()

router.get('/:id', ManagementDepartmentController.getSingleManagementDepartment)
router.patch(
  '/:id',
  validateRequest(
    DepartmentManagementValidation.updateDepartmentManagementZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
)
router.delete('/:id', ManagementDepartmentController.deleteManagementDepartment)
router.get('/', ManagementDepartmentController.getAllManagementDepartment)
router.post(
  '/create-department',
  validateRequest(
    DepartmentManagementValidation.createDepartmentManagementZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
)

export const ManagementDepartmentRoute = router
