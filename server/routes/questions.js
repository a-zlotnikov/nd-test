const express = require('express')
const router = express.Router()
const Question = require('../models/Question')

router.get('/', async function(req, res, next) {
  try {
    const result = await Question.find({})
    await res.json({response: result})
  } catch (e) {
    await res.json({response: false})
  }
})

router.post('/ask-question', async function(req, res, next) {
  try {
    const newQuestion =  new Question({
      title: req.body.title,
      text: req.body.text,
      image: req.body.image
    })
    await newQuestion.save()
    res.json({answer: 'ok'})
  } catch (e) {

  }
})

router.post('/answer-question', async function(req, res, next) {
  try {
    const {id, answer} = req.body
    await Question.findOneAndUpdate({_id: id}, {answer: answer})
    res.json({succeed: 'ok'})
  } catch (e) {

  }
})

router.delete('/delete-question', async function(req, res, next) {
  try {
    const {id} = req.body
    await Question.findOneAndDelete({_id: id})
    await res.json({answer: 'ok'})
  } catch (e) {

  }
})

module.exports = router
