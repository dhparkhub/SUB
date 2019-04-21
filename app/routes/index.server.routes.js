
const index = require('../controllers/index.server.ctrl')

module.exports = (app) => {
  app.get('/', index.render)
  app.get('/api/main', index.ranks)
}
