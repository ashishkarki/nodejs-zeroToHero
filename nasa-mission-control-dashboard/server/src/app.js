// express app
const express = require('express')
const cors = require('cors')
const path = require('path')

const planetsRouter = require('./routes/planets/planets.router')
const { logger } = require('./constants')

// the app
const app = express()
// logger(`app.js => Express app: ${app}`)

// middlwares
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(planetsRouter)

// load index.html of client by default at root /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app
