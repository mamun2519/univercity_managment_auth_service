import { Schema, model } from 'mongoose'
import { IStudent, StudentModel } from './student.interface'
import { bloodGroup, gender } from './student.constant'

// const StudentSchema = new Schema<IStudent, StudentModel>(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     name: {
//       firstName: {
//         type: String,
//         required: true,
//       },
//       MiddleName: {
//         type: String,
//       },
//       lastName: {
//         type: String,
//         required: true,
//       },
//       required: true,
//     },
//     dateOfBirth: {
//       type: String,
//       required: true,
//     },
//     gender: {
//       type: String,
//       enum: ['male', 'female'],
//       required: true,
//     },
//     bloodGroup: {
//       type: String,
//       enum: ['A+', 'A-', 'B+', 'AB+', 'AB-', 'O+', 'O-'],
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     contactNo: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     emergencyContactNO: {
//       type: String,
//       required: true,
//     },
//     presentAddress: {
//       type: String,
//       required: true,
//     },
//     permanentAddress: {
//       type: String,
//       required: true,
//     },
//     guardian: {
//       fatherName: {
//         type: String,
//         required: true,
//       },
//       fatherOccupation: {
//         type: String,
//         required: true,
//       },
//       fatherContactNo: {
//         type: String,
//         required: true,
//       },
//       motherName: {
//         type: String,
//         required: true,
//       },
//       motherOccupation: {
//         type: String,
//         required: true,
//       },
//       motherContactNo: {
//         type: String,
//         required: true,
//       },
//       address: {
//         type: String,
//         required: true,
//       },
//     },
//     localGuardian: {
//       name: {
//         type: String,
//         required: true,
//       },
//       occupation: {
//         type: String,
//         required: true,
//       },
//       contactNo: {
//         type: String,
//         required: true,
//       },

//       address: {
//         type: String,
//         required: true,
//       },
//     },
//     profileImage: {
//       type: String,
//       // required: true,
//     },
//     academicFaculty: {
//       type: Schema.Types.ObjectId,
//       ref: 'AcademicFaculty',
//       required: true,
//     },
//     academicDepartment: {
//       type: Schema.Types.ObjectId,
//       ref: 'AcademicDepartment',
//       required: true,
//     },
//     academicSemester: {
//       type: Schema.Types.ObjectId,
//       ref: 'AcademicSemester',
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   }
// )
export const StudentSchema = new Schema<IStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      required: true,
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    localGuardian: {
      required: true,
      type: {
        name: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId, // academicSemester --> _id
      ref: 'AcademicSemester',
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Student = model<IStudent, StudentModel>('Student', StudentSchema)
