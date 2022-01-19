const express = require('express')

const messagesController = require('../controllers/messages.controller')
const timeLoggerMiddleware = require('../middlewares/timeLogger.middleware')

const messagesRouter = express.Router()

// can also add middlewares to routers
messagesRouter.use((req, res, next) =>
  timeLoggerMiddleware(req, res, next, 'messages'),
)

messagesRouter.get('/', messagesController.getMessages)
messagesRouter.post('/', messagesController.postMessage)

module.exports = messagesRouter
