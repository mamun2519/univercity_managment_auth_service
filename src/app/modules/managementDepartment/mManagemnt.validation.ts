import { z } from 'zod'

const createDepartmentManagementZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
})
const updateDepartmentManagementZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
  }),
})

export const DepartmentManagementValidation = {
  createDepartmentManagementZodSchema,
  updateDepartmentManagementZodSchema,
}
