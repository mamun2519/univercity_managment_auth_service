import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../interfaces/erros'
import config from '../../config'
import handleValidationError from '../errors/handleValidation'
import API_Error from '../errors/ApiError'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages: IGenericErrorMessage[] = []

  if (err.name == 'ValidationError') {
    const validationError = handleValidationError(err)
    statusCode = validationError?.statusCode
    message = validationError?.message
    errorMessages = validationError.errorMessages
  } else if (err instanceof API_Error) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err.message ? [{ path: '', message: err?.message }] : []
  } else if (err instanceof Error) {
    message = err.message
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err.message : undefined,
  })
  next()
}

export default globalErrorHandler
