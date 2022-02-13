const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const User = require('../models/user.model')

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })

        if (!user) {
          return done(null, false, { message: 'Email/Username not registered' })
        }

        const isMatch = await user.isValidPassword(password)

        return isMatch
          ? done(null, user)
          : done(null, false, { message: 'Incorrect Password' })
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
