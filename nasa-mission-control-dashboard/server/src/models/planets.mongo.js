const mongoose = require('mongoose')

const planetsSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    required: true,
  },
})

// create the model
const planetsModel = mongoose.model('Planet', planetsSchema)

module.exports = planetsModel
