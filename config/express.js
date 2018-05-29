
const config = require('./config')
const express = require('express')
const morgan = require('morgan')
const compress = require('compression')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

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

  // 플래시 메시지 사용
  app.use(flash())

  // 세션 사용
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }))

  // 패스포트 모듈 등록 : 반드시 express-session 모듈 아래 등록해야 한다
  app.use(passport.initialize())
	app.use(passport.session())

  // EJS 템플릿 사용
  app.set('views', './app/views')
  app.set('view engine', 'ejs')

  // 정적 파일 서비스
  app.use(express.static('./public'))

  // 라우팅 파일 등록
  require('../app/routes/index.server.routes')(app)
  require('../app/routes/scores.server.routes')(app)

  return app
}
