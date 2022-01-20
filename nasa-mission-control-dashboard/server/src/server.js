const http = require('http')

// configure env files
const dotenv = require('dotenv')
dotenv.config()

// server port
const PORT = process.env.SERVER_EXPRESS_PORT || 5001

//server
const app = require('./app')
const server = http.createServer(app)

// listen
server.listen(PORT, () => {
  console.log(`server.js => Server is listening on port ${PORT}`)
})
