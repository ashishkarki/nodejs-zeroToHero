const { HTTP_STATUS_CODES } = require('../../constants')
const { getAllPlanets } = require('../../models/planets.model')

function httpGetAllPlanets(req, res) {
  const planets = getAllPlanets()

  return res.status(HTTP_STATUS_CODES.OK).json({
    count: planets.length,
    planets,
  })
}

module.exports = {
  httpGetAllPlanets,
}
