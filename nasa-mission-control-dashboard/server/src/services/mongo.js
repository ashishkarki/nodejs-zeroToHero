const mongoose = require('mongoose')

// MONGO URL
const MONGO_URL =
  process.env.SERVER_MONGO_URL || 'mongodb://localhost:27017/planets'

function setupMongooseListeners() {
  const default_connection = mongoose.connection

  default_connection.once('open', () => {
    console.log('server.js => Connected to MongoDB')
  })

  default_connection.on('error', (err) => {
    console.error(`server.js => Error connecting to MongoDB: ${err}`)
  })
}

async function mongoConnect() {
  // first connect to our mongo atlas database
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true, // ask mongoose to use new mongo url parsing method
    // useFindAndModify: false, // don't use old method of find and modify
    // useCreateIndex: true, // use create index instead of deprecated findAndModify
    useUnifiedTopology: true, // ask mongoose to use updated way of talking to our clusters
  })

  // setup our mongoose listeners
  setupMongooseListeners()
}

async function mongoDisconnect() {
  await mongoose.connection.close()

  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}
