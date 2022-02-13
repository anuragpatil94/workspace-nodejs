const mongoose = require('mongoose')
const User = require('../models/user.model')
const { roles } = require('../utils/constants')

const router = require('express').Router()

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find()
    // res.send(users)
    res.render('manage-users', { users })
  } catch (error) {
    next(error)
  }
})

router.get('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid Id')
      res.redirect('/admin/users')
      return
    }

    const person = await User.findById(id)

    if (!person) {
      req.flash('error', 'User Not Found')
      res.redirect('/admin/users')
      return
    }

    res.render('profile', { person })
  } catch (error) {
    next(error)
  }
})

router.post('/update-role', async (req, res, next) => {
  const { id, role } = req.body

  if (!id || !role) {
    req.flash('error', 'Invalid Request')
    return res.redirect('back')
  }

  // Check for Valid ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash('error', 'Invalid Id')
    return res.redirect('back')
  }

  // Check for Valid role
  const rolesArray = Object.values(roles)
  if (!rolesArray.includes(role)) {
    req.flash('error', 'Invalid Role')
    return res.redirect('back')
  }

  // Admin cannot remove as an animationDirection:
  if (req.user.id === id) {
    req.flash('error', 'Admin cannot change their own role')
    return res.redirect('back')
  }

  // update user
  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  )
  req.flash('info', `updated role for ${user.email} to ${user.role}`)
  res.redirect('back')
})

module.exports = router
