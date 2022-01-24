const { HTTP_STATUS_CODES } = require('../../constants')
const {
  getAllPlanets,
  deleteAllPlanets,
} = require('../../models/planets.model')

async function httpGetAllPlanets(_req, res) {
  const planets = await getAllPlanets()

  return res.status(HTTP_STATUS_CODES.OK).json({
    count: planets.length,
    planets,
  })
}

async function httpDeleteAllPlanets(req, res) {
  if (req.params.keyCode !== process.env.DELETE_ALL_PLANETS_KEY_CODE) {
    return res.status(HTTP_STATUS_CODES.FORBIDDEN).json({
      message: "Forbidden. Don't pry around in dark alleys..",
    })
  }

  const deletedPlanets = await deleteAllPlanets()

  return res.status(HTTP_STATUS_CODES.OK).json({
    message: `All planets deleted in total: ${deletedPlanets.length}`,
  })
}

module.exports = {
  httpGetAllPlanets,
  httpDeleteAllPlanets,
}
