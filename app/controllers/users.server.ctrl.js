
const common = require('../common')
const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.list = (req, res) => {
  User.find().sort({ created: -1 }).exec((err, users) => {
    if (err) return res.status(400).send({ message: common.getErrorMessage(err) })
    return res.json(users)
  })
}

exports.read = (req, res) => {
  User.findOne({ _id: req.params.userId }).exec((err, user) => {
    if (err) return res.status(400).send({ message: common.getErrorMessage(err) })
    if (!user) return res.status(404).send({ message: 'User not found' })
    return res.json(user)
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
