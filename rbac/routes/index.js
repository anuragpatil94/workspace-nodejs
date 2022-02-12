const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('Hello World!')
})

router.use('/auth', require('./auth.route'))
router.use('/user', require('./user.route'))

module.exports = router
