// express app
const express = require('express')
const cors = require('cors')

const planetsRouter = require('./routes/planets/planets.router')
const { logger } = require('./constants')

// the app
const app = express()
logger(`app.js => Express app: ${app}`)

// middlwares
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)
app.use(express.json())
app.use(planetsRouter)

module.exports = app
