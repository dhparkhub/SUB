
const common = require('../common')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Score = mongoose.model('Score')

exports.create = (req, res, next) => {
  const score = new Score({
    score: req.body.score,
    player: req.query.user ? req.query.user : req.user,
    created: req.body.created
  })
  score.save((err, score) => {
    if (err) return res.status(400).send({ message: common.getErrorMessage(err) })
    return res.json(score)
  })
}

exports.list = (req, res, next) => {
  // console.log('Scores list: ', req.query)
  const PUBLIC = 0;// 모든 사용자의 점수를 가져오는 모드
  const PRIVATE = 1;// 특정 사용자의 점수를 가져오는 모드

  const days = req.query.days ? req.query.days : 1
  const today = new Date()
  today.setMonth(today.getMonth() - 3)
  const fromThisYear = new Date(today.getFullYear(), 0, 1)

  const options = {
    created: { $gte: fromThisYear },
  }

  if (req.query.mode == PRIVATE) {
    // 특정 사용자에 대한 요청이 있으면 해당 사용자를,
    // 아니면 로그인된 사용자의 데이터를 불러오게 한다
    options.player = req.query.user ? req.query.user : req.user
  }

  Score.find(options).sort({ created: -1, _id: -1 }).populate('player', 'username').exec((err, scores) => {
    if (err) return res.status(400).send({ message: common.getErrorMessage(err) })
    return res.json(scores)
  })
}

exports.scoreById = (req, res, next, id) => {
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
		if (err) return res.status(400).send({ message: common.getErrorMessage(err) })
		return res.json(score)
	})
}

exports.delete = (req, res) => {
	const score = req.score
	score.remove((err, score) => {
		if (err) return res.status(400).send({ message: common.getErrorMessage(err) })
		return res.json(score)
	})
}

exports.count = (req, res) => {
  const options = {}
	Score.count(options, (err, count) => {
		if(err) return res.status(400).send({ message: common.getErrorMessage(err) })
		return res.json(count)
	})
}

exports.hasAuth = (req, res, next) => {
  if (req.score.player.id !== req.user.id) {
		return res.status(403).send({ message: 'User is not authorized' })
	}
	return next()
}
