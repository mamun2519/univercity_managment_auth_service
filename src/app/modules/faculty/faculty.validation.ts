import { z } from 'zod'
import { bloodGroup, gender } from './faculty.constant'

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'FirstName is Required',
        }),
        middleName: z
          .string({
            required_error: 'middleName is Required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'lastName is Required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: ' gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      email: z.string({
        required_error: 'email is required',
      }),
      contactNo: z.string({
        required_error: 'contactNo is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergencyContactNO is required',
      }),
      presentAddress: z.string({
        required_error: 'presentAddress is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress is required',
      }),
      designation: z.string({
        required_error: 'designation is required',
      }),

      profileImage: z
        .string({
          required_error: 'profileImage is required',
        })
        .optional(),
      academicFaculty: z.string({
        required_error: 'academicFaculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'academicDepartment is required',
      }),
    }),
  }),
})
//

const facultyUpdateZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImage: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
    designation: z.string().optional(),
  }),
})

export const FacultyValidation = {
  createFacultyZodSchema,
  facultyUpdateZodSchema,
}
