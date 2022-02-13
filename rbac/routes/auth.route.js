const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const passport = require('passport')

const User = require('../models/user.model')

router.get('/login', ensureNotAuthenticated, async (req, res, next) => {
  res.render('login')
})

router.post(
  '/login',
  ensureNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/user/profile',
    failureRedirect: '/auth/login',
    failureFlash: true,
  }),
  async (req, res, next) => {
    res.send('Post Login')
  }
)

router.get('/logout', ensureAuthenticated, async (req, res, next) => {
  req.logout()
  res.redirect('/')
})

router.get('/register', ensureNotAuthenticated, async (req, res, next) => {
  res.render('register')
})

router.post(
  '/register',
  ensureNotAuthenticated,
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email must be a valid email')
      .normalizeEmail()
      .toLowerCase(),
    body('password')
      .trim()
      .isLength(2)
      .withMessage('Password length short, min 2 char required'),
    body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password do not match')
      }
      return true
    }),
  ],
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

function ensureNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('back')
  } else {
    next()
  }
}

module.exports = router
