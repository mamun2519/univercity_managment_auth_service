import { z } from 'zod'

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    academicFaculty: z.string({
      required_error: 'academicFaculty is required',
    }),
  }),
})
const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    academicFaculty: z
      .string({
        required_error: 'academicFaculty is required',
      })
      .optional(),
  }),
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
}
