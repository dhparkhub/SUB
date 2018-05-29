
const common = require('../common')
const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.render = (req, res) => {
  return res.render('client/index', {
    title: 'SUB',
    user: JSON.stringify(req.user),
    username: req.user ? req.user.username : '',
    message: req.flash('error') || req.flash('info')
  })
}

exports.signup = (req, res) => {
  // console.log(`req.body: ${JSON.stringify(req.body)}`)

  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })

  user.save((err, user) => {// 사용자 저장
    if (err) return res.status(400).send({ message: common.getErrorMessage(err) })
    req.login(user, (err) => {// 사용자 로그인
      if(err) return res.status(400).send({ message: common.getErrorMessage(err) })
      return res.json(user)
    })
  })
}

exports.signin = passport.authenticate('local', {
  successRedirect: '/#!/',
  failureRedirect: '/#!/signin',
  failureFlash: true
})

exports.signout = (req, res) => {
  req.logout()
  return res.redirect('/')
}

exports.signed = (req, res, next) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not logged in' })
  return next()
}
