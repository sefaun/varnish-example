import express from 'express'
import cors from 'cors'
import morgan from 'morgan'


const start = async () => {
  try {

    const app = express()

    app.use(morgan('dev'))
    app.use(cors())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/api/test1', (_req, res, _next) => {
      return res.status(200).json({ status: true, message: "Test-1" })
    })

    app.get('/api/test2', (_req, res, _next) => {
      return res.status(200).json({ status: true, message: "Test-2" })
    })

    // Not Found
    app.use((_req, res, _next) => {
      return res.status(404).json({ success: false, message: 'Not Found' })
    })

    const port = 5000
    app.listen(port, () => console.log(`🟢 Server is Running on Port ${port}`))

  } catch (error) {
    return start()
  }
}

start()