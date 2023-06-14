import express from 'express'
import { AdminController } from './admin.controller'
import validateRequest from '../../middelewres/validateRequest'
import { AdminValidation } from './admin.validation'
const router = express.Router()

router.get('/:id', AdminController.getSingleAdmin)
router.patch(
  '/:id',
  validateRequest(AdminValidation.adminUpdateZodSchema),
  AdminController.updateAdmin
)
router.delete('/:id', AdminController.deleteAdmin)
router.get('/', AdminController.getAllAdmin)

export const AdminRoute = router
