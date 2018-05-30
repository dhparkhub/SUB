
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')

const ScoreSchema = new Schema({
  score: { type: Number, min: 0, max: 300, required: 'Score cannot be blank' },
  player: { type: Schema.ObjectId, ref: 'User', required: 'Player must be needed' },
  created: { type: Date, default: Date.now }
})

// 점수 저장 후 해당 사용자의 게임 횟수와 총 점수 증가
ScoreSchema.post('save', function (doc, next) {
  User.findOne({ _id: doc.player }, (err, user) => {
    if (err || !user) return next()
    user.scores.count++
    user.scores.total += doc.score
    user.save(() => next())
  })
})

// 점수 삭제 후 해당 사용자의 게임 횟수와 총 점수 감소
ScoreSchema.post('remove', function (doc, next) {
  User.findOne({ _id: doc.player }, (err, user) => {
    if (err || !user) return next()
    user.scores.count--
    user.scores.total -= doc.score
    user.save(() => next())
  })
})

mongoose.model('Score', ScoreSchema);
