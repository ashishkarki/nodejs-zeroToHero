const { HTTP_STATUS_CODES } = require('../../constants')
const {
  getAllLaunches,
  // addNewLaunch,
  scheduleNewLaunch,
  deleteLaunchById,
  doesLaunchByIdExist,
  updateLaunchById,
} = require('../../models/launches.model')

async function httpGetAllLaunches(req, res) {
  const launches = await getAllLaunches()

  return res.status(HTTP_STATUS_CODES.OK).json({
    count: launches.length,
    launches,
  })
}

function httpGetLaunchById(req, res) {
  const id = +req.params.id

  if (!doesLaunchByIdExist(id)) {
    return res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .send(`Launch with id ${id} not found.`)
  }

  const launch = getAllLaunches().find((launch) => launch.flightNumber === id)
  return res.status(HTTP_STATUS_CODES.OK).json(launch)
}

async function httpAddNewLaunch(req, res) {
  const nuLaunchPart = req.body

  // validate newLaunchPartial
  if (
    !nuLaunchPart.mission ||
    !nuLaunchPart.rocket ||
    !nuLaunchPart.launchDate ||
    !nuLaunchPart.destination
  ) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ error: 'Missing required fields.' })
  }

  nuLaunchPart.launchDate = new Date(nuLaunchPart.launchDate)
  if (
    nuLaunchPart.launchDate.toString() === 'Invalid Date' ||
    isNaN(nuLaunchPart.launchDate)
  ) {
    // means the new Date contructor couldn't parse the date string
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ error: 'Invalid launch date.' })
  }

  const newLaunch = await scheduleNewLaunch(nuLaunchPart)

  console.log(
    `launches.controller => httpAddNewLaunch => New launch: ${newLaunch}`,
  )
  return res.status(HTTP_STATUS_CODES.CREATED).json(newLaunch)
}

async function httpAbortLaunch(req, res) {
  const idToDelete = +req.params.id

  const existsLaunch = await doesLaunchByIdExist(idToDelete)
  if (!existsLaunch) {
    return res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .send(`Launch with id ${idToDelete} not found.`)
  } else {
    const didLaunchAbort = await deleteLaunchById(idToDelete)

    if (didLaunchAbort) {
      return res.status(HTTP_STATUS_CODES.OK).json({
        message: `Launch with id ${idToDelete} aborted.`,
      })
    } else {
      return res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: `Could not abort launch with id ${idToDelete}.` })
    }
  }
}

function httpUpdateLaunch(req, res) {
  const idToUpdate = +req.params.id

  if (!doesLaunchByIdExist(idToUpdate)) {
    return res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .send(`Launch with id ${idToUpdate} not found.`)
  }

  const launchToUpdate = req.body || {}
  const updatedLaunch = updateLaunchById(idToUpdate, launchToUpdate)

  return res.status(HTTP_STATUS_CODES.OK).json(updatedLaunch)
}

module.exports = {
  httpGetAllLaunches,
  httpGetLaunchById,
  httpAddNewLaunch,
  httpAbortLaunch,
  httpUpdateLaunch,
}
