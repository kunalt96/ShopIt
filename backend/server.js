const express = require('express')
const dotenv = require('dotenv')
const app = express()
const connectDB = require('./config/db')
const colors = require('colors')
dotenv.config()
const productRoutes = require('./routes/productRouting')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

connectDB()

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in at ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline.bold
  )
)
