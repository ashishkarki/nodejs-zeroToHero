const express = require('express')

const { URI_PATHS, logger } = require('../../constants')
const { getAllPlanets } = require('./planets.controller')

// planets router
const planetsRouter = express.Router()

// the routes
logger(`planets.router => planetsRouter: ${planetsRouter}`)
planetsRouter.get(URI_PATHS.PLANETS, getAllPlanets)

module.exports = planetsRouter
