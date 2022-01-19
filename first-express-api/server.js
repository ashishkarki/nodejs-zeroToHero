const express = require('express')
const { EXPRESS_PORT, URI_PATHS } = require('./constants')

const timeLoggerMiddleware = require('./middlewares/timeLogger.middleware')
const peopleRouter = require('./routes/people.router')
const messagesRouter = require('./routes/messages.router')

const serverStart = () => {
  const app = express()

  // middlewares
  app.use((req, res, next) => timeLoggerMiddleware(req, res, next, 'server.js'))

  app.use(express.json())

  // paths
  app.get('/', (_req, res) => {
    res.send('First Express API is working correctly...')
  })

  // api for people
  app.use(URI_PATHS.people, peopleRouter)

  // api for messages
  app.use(URI_PATHS.messages, messagesRouter)

  // listener
  app.listen(EXPRESS_PORT, () => {
    console.log(`Server is running on port ${EXPRESS_PORT}`)
  })
}

module.exports = {
  serverStart,
}
