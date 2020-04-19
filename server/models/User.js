const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  login: {type: String, reguired: true, unique: true},
  password: {type: String, required: true},
  username: String,
  isTeacher: Boolean
})

const User = mongoose.model('User', userSchema)

module.exports = User
