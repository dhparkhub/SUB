
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.PORT = process.env.PORT || 5000

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  return res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`${process.env.NODE_ENV} mode: Server running at port ${process.env.PORT}`)
})
