const router = require('express').Router()

router.get('/login', async (req, res, next) => {
  res.send('Login')
})

router.post('/login', async (req, res, next) => {
  res.send('Post Login')
})

router.get('/logout', async (req, res, next) => {
  res.send('Logout')
})

router.get('/register', async (req, res, next) => {
  res.send('Register')
})

router.post('/register', async (req, res, next) => {
  res.send('Post Register')
})

module.exports = router
