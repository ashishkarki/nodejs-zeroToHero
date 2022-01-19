const express = require('express')
const { EXPRESS_PORT } = require('./constants')

const peopleController = require('./controllers/people.controller')
const messagesController = require('./controllers/messages.controller')
const { application } = require('express')

const serverStart = () => {
  const app = express()

  // middlewares
  app.use((req, res, next) => {
    const start = Date.now()
    console.time('Request')

    console.log(`method: ${req.method} - url: ${req.url}`)
    next()

    const end = Date.now()
    console.timeEnd('Request')
    console.log(`time spent: ${end - start}ms`)
  })

  app.use(express.json())

  // paths
  app.get('/', (_req, res) => {
    res.send('First Express API is working correctly...')
  })

  // api for people
  app.get('/people', peopleController.getPeople)
  app.get('/people/:personId', peopleController.getPersonById)
  app.post('/people', peopleController.postPerson)

  // api for messages
  app.get('/messages', messagesController.getMessages)
  app.post('/messages', messagesController.postMessage)

  // listener
  app.listen(EXPRESS_PORT, () => {
    console.log(`Server is running on port ${EXPRESS_PORT}`)
  })
}

module.exports = {
  serverStart,
}
