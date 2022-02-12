const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

router.use('/auth', require('./auth.route'))
router.use('/user', require('./user.route'))

module.exports = router
