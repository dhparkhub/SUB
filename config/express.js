
const config = require('./config')
const express = require('express')
const morgan = require('morgan')
const compress = require('compression')
const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = () => {
  const app = express()

  // 배포 환경에 따른 다른 로그 모듈 사용
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress())
  }

  // req.body 데이터 파싱
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // 세션 사용
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }))

  // EJS 템플릿 사용
  app.set('views', './app/views')
  app.set('view engine', 'ejs')

  // 정적 파일 서비스
  app.use(express.static('./public'))

  // 라우팅 파일 등록
  require('../app/routes/index.server.routes')(app)

  return app
}
