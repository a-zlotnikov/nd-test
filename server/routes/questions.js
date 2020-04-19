const express = require('express')
const router = express.Router()
const Question = require('../models/Question')

router.get('/', async function(req, res, next) {
  try {

  } catch (e) {

  }
})

router.post('/ask-question', async function(req, res, next) {
  try {
    const newQuestion =  new Question({
      title: req.body.title,
      text: req.body.text
    })
    await newQuestion.save()
    res.json({answer: 'ok'})
  } catch (e) {

  }
})

router.post('/answer-question', async function(req, res, next) {
  try {

  } catch (e) {

  }
})

router.delete('/delete-question', async function(req, res, next) {
  try {

  } catch (e) {

  }
})

module.exports = router
