
const users = require('../controllers/users.server.ctrl')
const scores = require('../controllers/scores.server.ctrl')

module.exports = (app) => {
  app.route('/api/scores')
  .post(users.signed, scores.create)
  .get(scores.list)

  app.route('/api/scores/:scoreId')
  .get(scores.read)
  .put(users.signed, scores.update)
  .delete(users.signed, scores.delete)

  app.get('/api/scores/count', scores.count)

  app.param('scoreId', scores.scoreById)
}
