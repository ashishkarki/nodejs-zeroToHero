const { DEFAULT_FLIGHT_NUMBER } = require('../constants')
const launchesModel = require('./launches.mongo')
const planetsModel = require('./planets.mongo')

const launchesMap = new Map()

// let currentFlightNumber = 100

const launch = {
  flightNumber: DEFAULT_FLIGHT_NUMBER,
  mission: 'Kepler Explorer',
  rocket: 'Explorer IS1',
  launchDate: new Date('Dec 30, 2023'),
  destination: 'Kepler-442 b',
  customers: ['NASA', 'KASA', 'Explorer Net Org'],
  upcoming: true, // false once it is launched
  success: true, // false if it failed
}

// save a default hard-coded launch
saveLaunch(launch)
//  launchesMap.set(launch.flightNumber, launch)

async function getAllLaunches() {
  // const jsonCompatibleListOfLaunches = Array.from(launchesMap.values())
  // return jsonCompatibleListOfLaunches

  return await launchesModel.find(
    {},
    {
      _id: 0,
      __v: 0,
    },
  )
}

async function saveLaunch(launch) {
  const planetForThisLaunch = await planetsModel.findOne({
    kepler_name: launch.destination,
  })

  if (!planetForThisLaunch) {
    throw new Error(`Planet with kepler_name: ${launch.destination} not found.`)
  }

  return await launchesModel.updateOne(
    {
      // 1. find using this criteria
      flightNumber: launch.flightNumber,
    },
    launch,
    // {
    //   // 2. update with this criteria
    //   $set: {
    //     flightNumber: launch.flightNumber,
    //     mission: launch.mission,
    //     rocket: launch.rocket,
    //     launchDate: launch.launchDate,
    //     destination: launch.destination,
    //     customers: launch.customers,
    //     upcoming: launch.upcoming,
    //     success: launch.success,
    //   },
    // },
    {
      // 3. means an update that inserts a new document if no document matches the filter
      upsert: true,
    },
  )
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
// function addNewLaunch(newLaunch) {
//   currentFlightNumber++
//   launchesMap.set(currentFlightNumber, {
//     ...newLaunch,
//     upcoming: true,
//     success: true,
//     customer: [],
//     flightNumber: currentFlightNumber,
//   })

//   return launchesMap.get(currentFlightNumber)
// }
async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1

  const newLaunch = {
    ...launch,
    upcoming: true,
    success: true,
    customers: [],
    flightNumber: newFlightNumber,
  }

  return await saveLaunch(newLaunch)
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

async function getLatestFlightNumber() {
  const latestLaunch = await launchesModel
    .findOne({}, { _id: 0, flightNumber: 1 })
    // .sort({ flightNumber: -1 })
    .sort('-flightNumber') // descending order

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER
  }

  return latestLaunch.flightNumber
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
  // launchesMap,
  getAllLaunches,
  // addNewLaunch,
  scheduleNewLaunch,
  deleteLaunchById,
  doesLaunchByIdExist,
  updateLaunchById,
}
