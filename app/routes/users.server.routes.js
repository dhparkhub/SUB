
const users = require('../controllers/users.server.ctrl')

module.exports = (app) => {
  app.get('/api/users', users.list)
  app.get('/api/users/:userId', users.read)

  app.post('/signup', users.signup)
  app.post('/signin', users.signin)
  app.get('/signout', users.signout)
}
