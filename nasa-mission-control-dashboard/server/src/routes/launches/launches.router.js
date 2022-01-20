const express = require('express')

const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require('./launches.controller')

// the router
const launchesRouter = express.Router()

// paths
launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.post('/', httpAddNewLaunch)

module.exports = launchesRouter
