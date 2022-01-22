const express = require('express')

const { logger } = require('../../constants')
const { httpGetAllPlanets } = require('./planets.controller')

// planets router
const planetsRouter = express.Router()

// the routes
logger(`planets.router => planetsRouter: ${planetsRouter}`)
planetsRouter.get('/', httpGetAllPlanets)

module.exports = planetsRouter
