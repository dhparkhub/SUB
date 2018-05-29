
const index = require('../controllers/index.server.ctrl')

module.exports = (app) => {
  app.get('/', index.render)

  app.post('/signup', index.signup)
  app.post('/signin', index.signin)
  app.get('/signout', index.signout)
}
