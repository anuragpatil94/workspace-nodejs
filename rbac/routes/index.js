const { ensureLoggedIn } = require('connect-ensure-login')
const { roles } = require('../utils/constants')
const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.render('index')
})

router.use(
  '/admin',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureAdmin,
  require('./admin.route')
)
router.use('/auth', require('./auth.route'))
router.use(
  '/user',
  ensureLoggedIn({
    redirectTo: '/auth/login',
  }),
  require('./user.route')
)

function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next()
  } else {
    req.flash('warning', 'you are not Authorized to see this route')
    res.redirect('/')
  }
}

function ensureModerator(req, res, next) {
  if (req.user.role === roles.moderator) {
    next()
  } else {
    req.flash('warning', 'you are not Authorized to see this route')
    res.redirect('/')
  }
}

module.exports = router
