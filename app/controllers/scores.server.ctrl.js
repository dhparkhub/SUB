
const common = require('../common')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Score = mongoose.model('Score')

exports.create = (req, res, next) => {
  const score = new Score({
    score: req.body.score,
    player: req.user
  })
  score.save((err, score) => {
    if (err) return res.status(400).send({ message: getErrorMessage(err) })
    return res.json(score)
  })
}

exports.list = (req, res, next) => {
  const options = {}
  Score.find(options).sort({ created: -1 }).populate('player', 'username').exec((err, scores) => {
    if (err) return res.status(400).send({ message: getErrorMessage(err) })
    return res.json(scores)
  })
}

exports.scoreById = (req, res, next) => {
  Score.findById(id).populate('player').exec((err, score) => {
    if (err) return next(err)
    if (!score) return next(new Error('Failed to load score ' + id))
    req.score = score
    return next()
  })
}

exports.read = (req, res) => {
	return res.json(req.score)
}

exports.update = (req, res) => {
	const score = req.score
	score.score = req.body.score
	score.save((err, score) => {
		if (err) return res.status(400).send({ message: getErrorMessage(err) })
		return res.json(score)
	})
}

exports.delete = (req, res) => {
	const score = req.score
	score.remove((err, score) => {
		if (err) return res.status(400).send({ message: getErrorMessage(err) })
		return res.json(score)
	})
}

exports.count = (req, res) => {
  const options = {}
	Score.count(options, (err, count) => {
		if(err) return res.status(400).send({ message: getErrorMessage(err) })
		return res.json(count)
	})
}

exports.hasAuth = (req, res, next) => {
  if (req.score.player.id !== req.user.id) {
		return res.status(403).send({ message: 'User is not authorized' })
	}
	return next()
}
