const { logger } = require('../constants')

const launchesMap = new Map()

const launch = {
  flightNumber: 199,
  mission: 'Kepler Explorer',
  rocket: 'Explorer IS1',
  launchDate: new Date('Dec 30, 2023'),
  destination: 'Kepler-442 z',
  customer: ['NASA', 'KASA', 'Explorer Net Org'],
  upcoming: true, // false once it is launched
  success: true, // false if it failed
}

launchesMap.set(launch.flightNumber, launch)

// logger(`launches.model.js => Launches: ${launchesMap}`)

function getAllLaunches() {
  const jsonCompatibleListOfLaunches = Array.from(launchesMap.values())
  return jsonCompatibleListOfLaunches
}

module.exports = {
  launchesMap,
  getAllLaunches,
}
