
const config = require('./config')
const mongoose = require('mongoose')

module.exports = () => {
  // 데이터베이스 연결 시도
  const db = mongoose.connect(config.db).then(() => {
    console.log(`Database is successfully connected`)
  }, (err) => {
    console.error(`Database connection error: ${err}`)
  })

  // 모델 등록
  require('../app/models/user.server.model')
  require('../app/models/score.server.model')

  return db
}
