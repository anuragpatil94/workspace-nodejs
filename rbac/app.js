const express = require('express')
const createHttpErrors = require('http-errors')
const mongoose = require('mongoose')
const morgan = require('morgan')

require('dotenv').config()

const app = express()

// Logger
app.use(morgan('dev'))

// Routes
app.get('/', (req, res, next) => {
  res.send('Working!')
})

// Handling Errors
app.use((req, res, next) => {
  next(createHttpErrors.NotFound())
})

app.use((error, req, res, next) => {
  error.status = error.status || 500
  res.status(error.status).send(error)
})

const PORT = process.env.PORT || 4001

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB,
  })
  .then(() => {
    console.info('Mongo Server Connected!')

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
