
const common = require('../common')
const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Score = mongoose.model('Score')

exports.render = (req, res) => {
  return res.render('client/index', {
    title: 'SUB',
    user: JSON.stringify(req.user),
    username: req.user ? req.user.username : 'User',
    message: req.flash('error') || req.flash('info')
  })
}

exports.ranks = (req, res) => {
  const options = [
    {
      $match: {
        // created: { $gte: new Date("2018-01-01") }
      }
    },
    {
      $group: {
        _id: "$player",
        total: { $sum: "$score" },
        count: { $sum: 1 },
        average: { $avg: "$score" }
      }
    }, {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "player"
      }
    }, {
      $sort:  {
        average: -1
      }
    }, {
      $unwind: "$player"
    }
  ]
  Score.aggregate(options, (err, scores) => {
    if (err) return res.status(400).send({ message: common.getErrorMessage(err) })
    return res.json(scores)
  })
}

/*
db.getCollection("scores").aggregate([{$group:{_id:"$player",total:{$sum:"$score"},count:{$sum:1},average:{$avg:"$score"}}},{$lookup:{from:"users",localField:"_id",foreignField:"_id",as:"player"}},{$sort:{average:-1}},{$unwind:"$player"}]);
*/
