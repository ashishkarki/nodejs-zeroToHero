const express = require('express')
const { EXPRESS_PORT, URI_PATHS } = require('./constants')

const timeLoggerMiddleware = require('./middlewares/timeLogger.middleware')
const peopleRouter = require('./routes/people.router')
const messagesRouter = require('./routes/messages.router')
const path = require('path')

const serverStart = () => {
  const app = express()

  // middlewares
  app.use((req, res, next) => timeLoggerMiddleware(req, res, next, 'server.js'))

  const publicPath = path.join(__dirname, URI_PATHS.PUBLIC)
  app.use('/site', express.static(publicPath))
  app.use(express.json())

  // paths
  app.get('/', (_req, res) => {
    res.send('First Express API is working correctly...')
  })

  // api for people
  app.use(URI_PATHS.PEOPLE, peopleRouter)

  // api for messages
  app.use(URI_PATHS.MESSAGES, messagesRouter)

  // listener
  app.listen(EXPRESS_PORT, () => {
    console.log(`Server is running on port ${EXPRESS_PORT}`)
  })
}

module.exports = {
  serverStart,
}
