const router = require('express').Router()

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

router.get('/', (req, res, next) => {
  res.render('index')
})

router.use('/auth', require('./auth.route'))
router.use('/user', ensureAuthenticated, require('./user.route'))

module.exports = router
