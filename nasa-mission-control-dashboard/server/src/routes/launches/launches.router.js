const express = require('express')

const {
  httpGetAllLaunches,
  httpGetLaunchById,
  httpAddNewLaunch,
  httpAbortLaunch,
  httpUpdateLaunch,
} = require('./launches.controller')

// the router
const launchesRouter = express.Router()

// paths
launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.get('/:id', httpGetLaunchById)
launchesRouter.post('/', httpAddNewLaunch)
launchesRouter.delete('/:id', httpAbortLaunch)
launchesRouter.put('/:id', httpUpdateLaunch)

module.exports = launchesRouter
