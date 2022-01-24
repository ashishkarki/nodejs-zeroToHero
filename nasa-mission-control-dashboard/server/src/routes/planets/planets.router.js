const express = require('express')

const { logger } = require('../../constants')
const {
  httpGetAllPlanets,
  httpDeleteAllPlanets,
} = require('./planets.controller')

// planets router
const planetsRouter = express.Router()

// the routes
// logger(`planets.router => planetsRouter: ${planetsRouter}`)
// GET all planets
planetsRouter.get('/', httpGetAllPlanets)

// DELETE all planets. DANGEROUS! - use with caution
// only accept if the hardcoded keyCode matches
planetsRouter.delete('/all/:keyCode', httpDeleteAllPlanets)

module.exports = planetsRouter
