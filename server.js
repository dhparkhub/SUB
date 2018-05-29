
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.PORT = process.env.PORT || 5000

const express = require('./config/express')
const app = express()

app.listen(process.env.PORT, () => {
  console.log(`${process.env.NODE_ENV} mode: Server running at port ${process.env.PORT}`)
})
