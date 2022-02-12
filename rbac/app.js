const connectFlash = require('connect-flash')
const createHttpErrors = require('http-errors')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')

require('dotenv').config()

const app = express()

// Logger
app.use(morgan('dev'))

// View Engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure:true   //only when using https server
      httpOnly: true,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())
require('./utils/passport.auth')

app.use(connectFlash())
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

// Routes
app.use('/', require('./routes'))

// Handling Errors
app.use((req, res, next) => {
  next(createHttpErrors.NotFound())
})

app.use((error, req, res, next) => {
  error.status = error.status || 500
  res.status(error.status).render('error_40x', { error })
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
