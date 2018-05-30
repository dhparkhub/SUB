
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
