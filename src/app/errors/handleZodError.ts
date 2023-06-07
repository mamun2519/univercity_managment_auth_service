import { ZodError, ZodIssue } from 'zod'
import { IGenaricErrorResponse } from '../interfaces/common'
import { IGenericErrorMessage } from '../interfaces/erros'

const handleZodError = (error: ZodError): IGenaricErrorResponse => {
  const statusCode = 400
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }
  })
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleZodError
