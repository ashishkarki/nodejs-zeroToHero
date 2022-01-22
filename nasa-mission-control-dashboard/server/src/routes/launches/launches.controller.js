const { HTTP_STATUS_CODES } = require('../../constants')
const {
  getAllLaunches,
  addNewLaunch,
  deleteLaunchById,
  doesLaunchByIdExist,
} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
  const launches = getAllLaunches()

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

function httpAddNewLaunch(req, res) {
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
      .send(
        'Invalid Launch input!!. Please provide mission, rocket, launchDate & destination fields.',
      )
  }

  nuLaunchPart.launchDate = new Date(nuLaunchPart.launchDate)
  if (
    nuLaunchPart.launchDate.toString() === 'Invalid Date' ||
    isNaN(nuLaunchPart.launchDate)
  ) {
    // means the new Date contructor couldn't parse the date string
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .send('Invalid Launch input!!. Please provide a valid launchDate.')
  }

  const newLaunch = addNewLaunch(nuLaunchPart)

  return res.status(HTTP_STATUS_CODES.CREATED).json(newLaunch)
}

function httpAbortLaunch(req, res) {
  const idToDelete = +req.params.id

  if (!doesLaunchByIdExist(idToDelete)) {
    return res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .send(`Launch with id ${idToDelete} not found.`)
  } else {
    const abortedLaunch = deleteLaunchById(idToDelete)
    return res.status(HTTP_STATUS_CODES.OK).json(abortedLaunch)
  }
}

module.exports = {
  httpGetAllLaunches,
  httpGetLaunchById,
  httpAddNewLaunch,
  httpAbortLaunch,
}
