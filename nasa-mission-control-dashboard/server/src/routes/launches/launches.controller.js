const { HTTP_STATUS_CODES } = require('../../constants')
const { getAllLaunches } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
  return res.status(HTTP_STATUS_CODES.OK).json(getAllLaunches())
}

module.exports = {
  httpGetAllLaunches,
}
