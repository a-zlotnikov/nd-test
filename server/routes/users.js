const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/login', async function(req, res, next) {
  try {
    const {login, password} = req.body
    console.log(login, password);
    console.log(User);
    const user = await User.findOne({login})
    console.log(user);
    if (user.password === password) {
      req.session.user = user
      res.json(req.session)
    } else {
      await res.json({logged_in: false})
    }
  } catch (e) {
    await res.json({logged_in: false})
  }
})

router.post('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router
