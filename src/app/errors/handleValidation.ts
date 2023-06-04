import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/erros'
import { IGenaricErrorResponse } from '../interfaces/common'

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenaricErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    element => {
      return {
        path: element?.path,
        message: element?.message,
      }
    }
  )

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
  //   const statusCode = 400
  //   return errors
}

export default handleValidationError
