const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  title: {type: String, reguired: true},
  text: {type: String, required: true},
  answer: {type: String, default: ''},
  date: {type: Date, default: Date.now}
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
