
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

const UserSchema = new Schema({
  role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
  email: {
    type: String,
    match: [ /.+\@.+\..+/, 'Invalid email address' ],
    unique: 'Email cannot be duplicated',
    required: 'Email cannot be blank'
  },
  username: { type: String, required: 'Username cannot be blank' },
  password: { type: String, required: 'Password cannot be blank' },
  salt: { type: String },
  created: { type: Date, default: Date.now }
})

// 사용자를 저장하기 전에 비밀번호를 단방향 암호화하여 저장한다
UserSchema.pre('save', function (next) {
  if (this.password && !this.salt) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'))
    this.password = this.hashPassword(this.password, this.salt)
  }
  next()
})

// 단방향 암호화 메소드
UserSchema.methods.hashPassword = function (password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')
}

// 사용자 인증 메소드
UserSchema.methods.authenticate = function (password, salt) {
  return this.password === this.hashPassword(password, salt)
}

mongoose.model('User', UserSchema)
