import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middelewres/globalErrorHandler'

import applicationRoutes from './app/routes'
import { StatusCodes } from 'http-status-codes'
// parser --
const app: Application = express()
app.use([express.json(), express.urlencoded({ extended: true }), cors()])

// APPLICATION ROUTES
app.use('/api/v1/', applicationRoutes)

// testing
app.get('/health', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'sever start' })
})
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'sever start' })
})

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler)

// HANDEL NOT FOUND ROUTE
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: req.originalUrl, message: 'API not found!' }],
  })
  next()
})
export default app
