import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middelewres/globalErrorHandler'

import applicationRoutes from './app/routes'
// parser --
const app: Application = express()
app.use([express.json(), express.urlencoded({ extended: true }), cors()])

// APPLICATION ROUTES
app.use('/api/v1/', applicationRoutes)

// testing
app.get('/health', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'sever start' })
  // Promise.reject(new Error('Oree errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'))
})

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler)
export default app
