const router = require('express').Router()

const User = require('../models/user.model')

router.get('/login', async (req, res, next) => {
  res.render('login')
})

router.post('/login', async (req, res, next) => {
  res.send('Post Login')
})

router.get('/logout', async (req, res, next) => {
  res.send('logout')
})

router.get('/register', async (req, res, next) => {
  res.render('register')
})

router.post('/register', async (req, res, next) => {
  try {
    const { email } = req.body
    const doesUserExist = await User.findOne({ email })

    if (doesUserExist) {
      res.redirect('/auth/register')
      return
    }

    const user = new User(req.body)
    await user.save()

    res.send(user)
  } catch (e) {
    next(e)
  }
})

module.exports = router
