const { DEFAULT_FLIGHT_NUMBER } = require('../constants')
const launchesModel = require('./launches.mongo')
const planetsModel = require('./planets.mongo')

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

async function getAllLaunches() {
  return await launchesModel.find(
    {},
    {
      _id: 0,
      __v: 0,
    },
  )
}

async function saveLaunch(launch) {
  // first check if the 'Planet' exists
  const planetForThisLaunch = await planetsModel.findOne({
    kepler_name: launch.destination,
  })

  if (!planetForThisLaunch) {
    throw new Error(`Planet with kepler_name: ${launch.destination} not found.`)
  }

  // then check if the 'Launch' exists
  let findOneClause = {
    mission: launch.mission,
  }
  if (launch.flightNumber) {
    findOneClause = {
      ...findOneClause,
      flightNumber: launch.flightNumber,
    }
  }

  const foundLaunch = await launchesModel.findOne(findOneClause)

  if (foundLaunch) {
    console.log(
      `Found existing launch with flightNumber: ${launch.flightNumber}`,
    )

    const savedLaunch = await launchesModel.updateOne(
      // {
      //   // 1. find using this criteria
      //   flightNumber: Number(launch.flightNumber),
      //   mission: launch.mission,
      // },
      // 2. update with this criteria
      {
        ...launch,
        // flightNumber: newFlightNumber,
      },
      // {
      //   // 3. means an update that inserts a new document if no document matches the filter
      //   upsert: true,
      // },
    )

    console.log(
      `launches.model => saveLaunch() => Saved new launch: ${savedLaunch}`,
    )
    return savedLaunch
  } else {
    console.log(`No existing launch with flightNumber: ${launch.flightNumber}`)

    const newFlightNumber = (await getLatestFlightNumber()) + 1

    console.log(`New flightNumber: ${newFlightNumber}`)
    console.log(`New launch: ${JSON.stringify(launch)}`)
    const newlyCreatedLaunch = await launchesModel.create({
      ...launch,
      flightNumber: newFlightNumber,
    })

    return newlyCreatedLaunch
  }
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
async function scheduleNewLaunch(launch) {
  // const newFlightNumber = (await getLatestFlightNumber()) + 1

  const newLaunch = {
    ...launch,
    upcoming: true,
    success: true,
    customers: [],
    // flightNumber: DEFAULT_FLIGHT_NUMBER,
  }

  const savedLaunch = await saveLaunch(newLaunch)
  console.log(
    `launches.model => scheduleNewLaunch() => Saved new launch: ${savedLaunch}`,
  )
  return savedLaunch
}

async function deleteLaunchById(id) {
  const updatedLaunch = await launchesModel.updateOne(
    {
      flightNumber: Number(id),
    },
    {
      upcoming: false,
      success: false,
    },
  )

  return updatedLaunch.modifiedCount === 1
}

async function doesLaunchByIdExist(id) {
  // return launchesMap.has(id)
  const foundLaunch = await launchesModel.findOne({
    flightNumber: Number(id),
  })

  return !!foundLaunch
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
  getAllLaunches,
  scheduleNewLaunch,
  deleteLaunchById,
  doesLaunchByIdExist,
  updateLaunchById,
}
