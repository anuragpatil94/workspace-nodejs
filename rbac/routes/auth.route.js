const router = require('express').Router()

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
  res.send('Post Register')
})

module.exports = router
