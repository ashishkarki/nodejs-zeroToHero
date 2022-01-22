const express = require('express')

const {
  httpGetAllLaunches,
  httpGetLaunchById,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require('./launches.controller')

// the router
const launchesRouter = express.Router()

// paths
launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.get('/:id', httpGetLaunchById)
launchesRouter.post('/', httpAddNewLaunch)
launchesRouter.delete('/:id', httpAbortLaunch)

module.exports = launchesRouter
