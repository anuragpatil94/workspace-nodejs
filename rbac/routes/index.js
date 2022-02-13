const connectEnsureLogin = require('connect-ensure-login')
const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

router.use('/auth', require('./auth.route'))
router.use(
  '/user',
  connectEnsureLogin.ensureLoggedIn({
    redirectTo: '/auth/login',
  }),
  require('./user.route')
)

module.exports = router
