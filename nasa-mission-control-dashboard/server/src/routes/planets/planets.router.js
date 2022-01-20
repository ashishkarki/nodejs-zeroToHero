const express = require('express')

const { URI_PATHS, logger } = require('../../constants')
const { httpGetAllPlanets } = require('./planets.controller')

// planets router
const planetsRouter = express.Router()

// the routes
logger(`planets.router => planetsRouter: ${planetsRouter}`)
planetsRouter.get(URI_PATHS.PLANETS, httpGetAllPlanets)

module.exports = planetsRouter
