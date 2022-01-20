const { HTTP_STATUS_CODES, logger } = require('../../constants')
const { planets } = require('../../models/planets.model')

function getAllPlanets(req, res) {
  logger(`planets.controller => GET planets count: ${planets.length}`)
  return res.status(HTTP_STATUS_CODES.OK).json(planets)
}

module.exports = {
  getAllPlanets,
}
