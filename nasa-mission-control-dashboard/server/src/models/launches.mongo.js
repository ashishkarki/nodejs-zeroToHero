const mongoose = require('mongoose')

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    default: 100,
    auto: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  destination: {
    // also called 'target'
    // type: mongoose.ObjectId,
    // ref: 'Planet', // reference to the Planet model

    // the above technique might make it complex
    // to use the planet model to get the planet name
    type: String, // put the actual planet name here
    required: true,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
    default: true,
  }, // false once it is launched
  success: {
    type: Boolean,
    required: true,
    default: true,
  }, // false if it failed
})

// create the model
// mongoose uses the name 'Launch' and creates a new collection
// with pluralized name 'launches' in mongodb
const launchesModel = mongoose.model('Launch', launchesSchema)

module.exports = launchesModel
