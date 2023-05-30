import express, { Application, Request, Response } from 'express'
import cors from 'cors'
// parser --
const app: Application = express()
app.use([express.json(), express.urlencoded({ extended: true }), cors()])

// testings
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'sever start' })
})

export default app
