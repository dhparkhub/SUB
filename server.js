
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.PORT = process.env.PORT || 5000

const mongoose = require('./config/mongoose')
const db = mongoose()

const express = require('./config/express')
const app = express()

const passport = require('./config/passport')()

app.listen(process.env.PORT, () => {
  console.log(`${process.env.NODE_ENV} mode: Server running at port ${process.env.PORT}`)
})
