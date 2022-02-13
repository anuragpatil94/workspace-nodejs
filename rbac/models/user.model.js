const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const createHttpError = require('http-errors')
const { roles } = require('../utils/constants')

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(roles),
    default: roles.client,
  },
})

UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword

      // Check for Admin
      if (this.email == process.env.ADMIN_EMAIL.toLowerCase()) {
        this.role = roles.admin
      }
    }

    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw createHttpError.InternalServerError(error.message)
  }
}

const User = mongoose.model('user', UserSchema)

module.exports = User
