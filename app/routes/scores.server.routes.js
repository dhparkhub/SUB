
const index = require('../controllers/index.server.ctrl')
const scores = require('../controllers/scores.server.ctrl')

module.exports = (app) => {
  app.route('/api/scores')
  .post(index.signed, scores.create)
  .get(scores.list)

  app.route('/api/scores/:scoreId')
  .get(scores.read)
  .put(index.signed, scores.hasAuth, scores.update)
  .delete(index.signed, scores.hasAuth, scores.delete)

  app.get('/api/scores/count', scores.count)

  app.param('scoreId', scores.scoreById)
}
