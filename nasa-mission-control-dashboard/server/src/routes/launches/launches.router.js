const express = require('express')

const { httpGetAllLaunches } = require('./launches.controller')

// the router
const launchesRouter = express.Router()

// paths
launchesRouter.get('/launches', httpGetAllLaunches)

module.exports = launchesRouter
