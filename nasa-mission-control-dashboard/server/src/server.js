const http = require('http')

// configure env files
const dotenv = require('dotenv')
dotenv.config()

// server port
const PORT = process.env.SERVER_EXPRESS_PORT || 5001

//server
const app = require('./app')

// mongo connection
const { mongoConnect } = require('./services/mongo')

// create our server using the app.js file
const server = http.createServer(app)

// load the planets model data
async function startServer() {
  // connect to mongo first
  await mongoConnect()

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
