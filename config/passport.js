
const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    // 패스워드와 salt는 제외하고 사용자 정보를 반환한다 
    User.findOne({ _id: id }, '-password -salt', (err, user) => done(err, user))
  })

  // 전략 등록
  require('./strategies/local')()
}
