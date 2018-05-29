
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = () => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false, { message: 'Unknown User' })
      if (!user.authenticate(password, user.salt)) return done(null, false, { message: 'Invalid password' })
      return done(null, user)
    })
  }))
}
