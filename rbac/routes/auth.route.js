const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const router = require('express').Router()
const { validationResult } = require('express-validator')
const passport = require('passport')

const User = require('../models/user.model')
const { registerValidator } = require('../utils/validators')

router.get(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }),
  async (req, res, next) => {
    res.render('login')
  }
)

router.post(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }),
  passport.authenticate('local', {
    // successRedirect: '/',
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  }),
  async (req, res, next) => {
    res.send('Post Login')
  }
)

router.get(
  '/logout',
  ensureLoggedIn({ redirectTo: '/' }),
  async (req, res, next) => {
    req.logout()
    res.redirect('/')
  }
)

router.get(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }),
  async (req, res, next) => {
    res.render('register')
  }
)

router.post(
  '/register',
  ensureLoggedOut({ redirectTo: '/' }),
  registerValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash('error', error.msg)
        })
        res.render('register', { email: req.body.email, messages: req.flash() })
        return
      }

      const { email } = req.body
      const doesUserExist = await User.findOne({ email })

      if (doesUserExist) {
        res.redirect('/auth/register')
        return
      }

      const user = new User(req.body)
      await user.save()

      req.flash('success', `${user.email} registered successfully!`)
      res.redirect('/auth/login')
    } catch (e) {
      next(e)
    }
  }
)

module.exports = router
