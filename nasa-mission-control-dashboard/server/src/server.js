const http = require('http')
const mongoose = require('mongoose')

// configure env files
const dotenv = require('dotenv')
dotenv.config()
console.log(`mongo url: ${process.env.SERVER_MONGO_URL}`)

// server port
const PORT = process.env.SERVER_EXPRESS_PORT || 5001
// MONGO URL
const MONGO_URL =
  process.env.SERVER_MONGO_URL || 'mongodb://localhost:27017/planets'

//server
const app = require('./app')
const server = http.createServer(app)

function setupMongooseListeners() {
  const default_connection = mongoose.connection

  default_connection.once('open', () => {
    console.log('server.js => Connected to MongoDB')
  })

  default_connection.on('error', (err) => {
    console.error(`server.js => Error connecting to MongoDB: ${err}`)
  })
}

// load the planets model data
async function startServer() {
  // first connect to our mongo atlas database
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true, // ask mongoose to use new mongo url parsing method
    // useFindAndModify: false, // don't use old method of find and modify
    // useCreateIndex: true, // use create index instead of deprecated findAndModify
    useUnifiedTopology: true, // ask mongoose to use updated way of talking to our clusters
  })

  // setup mongoose listeners
  setupMongooseListeners()

  // get the planets model which interfaces with the Data/DB
  const { planetsModelMain } = require('./models/planets.model')
  // and call it so the server has planets data before it starts listening below
  await planetsModelMain()

  // listen
  server.listen(PORT, () => {
    console.log(`server.js => Server is listening on port ${PORT}`)
  })
}

startServer()
