import { z } from 'zod'
import { bloodGroup, gender } from '../student/student.constant'

const createUserZodSchema = z.object({
  body: z.object({
    // role: z.string({
    //   required_error: 'Role is required',
    // }),
    password: z.string().optional(),
    student: z.object({
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
      guardian: z.object({
        fatherName: z.string({
          required_error: 'fatherName is required',
        }),
        fatherOccupation: z.string({
          required_error: 'fatherOccupation Name is required',
        }),
        fatherContactNo: z.string({
          required_error: 'fatherOccupation Name is required',
        }),
        motherName: z.string({
          required_error: 'fatherOccupation Name is required',
        }),
        motherOccupation: z.string({
          required_error: 'motherOccupation Name is required',
        }),
        motherContactNo: z.string({
          required_error: 'motherContactNo Name is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'name is required',
        }),
        occupation: z.string({
          required_error: 'occupation is required',
        }),
        contactNo: z.string({
          required_error: 'contactNo is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
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
      academicSemester: z.string({
        required_error: 'academicSemester is required',
      }),
    }),
  }),
})
//     await createUserZodSchema.parseAsync(req)

export const UserValidation = {
  createUserZodSchema,
}
