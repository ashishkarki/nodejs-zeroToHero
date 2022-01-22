const launchesMap = new Map()

let currentFlightNumber = 100

const launch = {
  flightNumber: currentFlightNumber,
  mission: 'Kepler Explorer',
  rocket: 'Explorer IS1',
  launchDate: new Date('Dec 30, 2023'),
  destination: 'Kepler-442 z',
  customer: ['NASA', 'KASA', 'Explorer Net Org'],
  upcoming: true, // false once it is launched
  success: true, // false if it failed
}

launchesMap.set(launch.flightNumber, launch)

function getAllLaunches() {
  const jsonCompatibleListOfLaunches = Array.from(launchesMap.values())
  return jsonCompatibleListOfLaunches
}

/**
 *
 * @param newLaunch - required fields and example below:
  * {
      "mission": "Kepler Explorer",
      "rocket": "Explorer IS1",
      "launchDate": "Dec 30, 2099",
      "destination": "Kepler-442 z",
  }
 */
function addNewLaunch(newLaunch) {
  currentFlightNumber++
  launchesMap.set(currentFlightNumber, {
    ...newLaunch,
    upcoming: true,
    success: true,
    customer: [],
    flightNumber: currentFlightNumber,
  })

  return launchesMap.get(currentFlightNumber)
}

function deleteLaunchById(id) {
  console.log(`Deleting launch with id ${id}: `, launchesMap.get(id))

  const abortedLaunch = launchesMap.get(id)
  abortedLaunch.upcoming = false
  abortedLaunch.success = false
  currentFlightNumber--

  return abortedLaunch
}

function doesLaunchByIdExist(id) {
  return launchesMap.has(id)
}

function updateLaunchById(id, update) {
  const updatedLaunch = {
    ...launchesMap.get(id),
    ...update,
  }

  launchesMap.set(id, updatedLaunch)

  return updatedLaunch
}

module.exports = {
  launchesMap,
  getAllLaunches,
  addNewLaunch,
  deleteLaunchById,
  doesLaunchByIdExist,
  updateLaunchById,
}
