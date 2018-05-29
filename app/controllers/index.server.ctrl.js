
exports.render = (req, res) => {
  return res.render('client/index', {
    title: 'SUB',
    user: JSON.stringify(req.user)
  })
}
