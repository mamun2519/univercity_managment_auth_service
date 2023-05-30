import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/route'
// parser --
const app: Application = express()
app.use([express.json(), express.urlencoded({ extended: true }), cors()])

// APPLICATION ROUTES
app.use('/api/v1/users', userRouter)
// testing
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'sever start' })
})

export default app
