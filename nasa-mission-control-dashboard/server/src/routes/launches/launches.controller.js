const { HTTP_STATUS_CODES } = require('../../constants')
const { getAllLaunches, addNewLaunch } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
  const launches = getAllLaunches()

  return res.status(HTTP_STATUS_CODES.OK).json({
    count: launches.length,
    launches,
  })
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

  addNewLaunch(nuLaunchPart)

  return res.status(HTTP_STATUS_CODES.CREATED).json(nuLaunchPart)
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
}
