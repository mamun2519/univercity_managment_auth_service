/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../interfaces/erros'
import config from '../../config'
import handleValidationError from '../errors/handleValidation'
import API_Error from '../errors/ApiError'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'
import handleCastError from '../errors/handleCastError'

// eslint-disable-next-line no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages: IGenericErrorMessage[] = []

  // eslint-disable-next-line no-unused-expressions
  config.env == 'development'
    ? console.log('globalErrorHandler --', err)
    : console.log(err)

  // handle validation error
  if (err.name == 'ValidationError') {
    const validationError = handleValidationError(err)
    statusCode = validationError?.statusCode
    message = validationError?.message
    errorMessages = validationError.errorMessages
    // handle api error
  } else if (err instanceof API_Error) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err.message ? [{ path: '', message: err?.message }] : []
  }
  // ZOD VALIDATION ERROR HANDLE
  else if (err instanceof ZodError) {
    console.log('This is errorrrrrr')
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  }
  // CAST ERROR HANDEL
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  }

  // CUSTOM ERROR
  else if (err instanceof Error) {
    message = err.message
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : []
  }

  //  DEFAULT ERROR
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err.message : undefined,
  })
}

export default globalErrorHandler
