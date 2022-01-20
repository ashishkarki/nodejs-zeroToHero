const { HTTP_STATUS_CODES } = require('../../constants')
const { getAllPlanets } = require('../../models/planets.model')

function httpGetAllPlanets(req, res) {
  return res.status(HTTP_STATUS_CODES.OK).json(getAllPlanets())
}

module.exports = {
  httpGetAllPlanets,
}
