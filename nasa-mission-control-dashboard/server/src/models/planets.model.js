const { parse } = require('csv-parse')
const path = require('path')
const fs = require('fs')

const { logger } = require('../constants')

const planetsModel = require('../models/planets.mongo')

const habitablePlanets = []

const isHabitablePlanet = (planet) => {
  return (
    planet.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  )
}

const getAndParsePlanetsData = (filePath) => {
  return new Promise((resolve, reject) => {
    const fsStream = fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', filePath),
    )

    fsStream
      .pipe(
        parse({
          comment: '#',
          columns: true,
          delimiter: ',',
        }),
      )
      .on('data', async (chunk) => {
        if (isHabitablePlanet(chunk)) {
          savePlanet(chunk)
        }
      })
      .on('error', (err) => {
        console.log(`Error reading file..${err}`)

        reject(err)
      })
      .on('end', async () => {
        const foundPlanets = (await getAllPlanets()).map((planet) => {
          return planet.kepler_name
        })
        habitablePlanets.push(...foundPlanets)

        console.log(
          `getAndParsePlanetsData() => ${habitablePlanets.length} habitable planets found.`,
        )

        resolve()
      })
  })
}

const planetsModelMain = async () => {
  await getAndParsePlanetsData('kepler_data.csv')
}

// basically, only update/add new planet if the first
// find operation doesn't find an existing record
async function savePlanet(planet) {
  try {
    await planetsModel.updateOne(
      {
        // try to FIND by this criteria
        kepler_name: planet.kepler_name,
      },
      {
        // if (NOT) found, UPDATE with this criteria
        kepler_name: planet.kepler_name,
      },
      {
        // this causese the second argument above to only
        // UPDATE if the FIND argument above returns nothing
        upsert: true,
      },
    )
  } catch (err) {
    console.log(`savePlanet() => Could not save planet. ${err}`)
  }
}

async function getAllPlanets() {
  const allPlanets = await planetsModel.find(
    {},
    {
      // exclude these fields
      _id: 0,
      __v: 0,
    },
  )

  console.log(`getAllPlanets() => ${allPlanets.length}`)
  return allPlanets
}

async function deleteAllPlanets() {
  const allPlanets = await planetsModel.find({})

  if (allPlanets.length > 0) {
    try {
      const deletedPlanets = await planetsModel.deleteMany({})
      console.log(`deleteAllPlanets() => ${deletedPlanets.deletedCount}`)
      return deletedPlanets
    } catch (err) {
      console.log(`deleteAllPlanets() => Could not delete all planets. ${err}`)
    }
  } else {
    console.log('deleteAllPlanets() => No planets to delete')
    return []
  }
}

module.exports = {
  planetsModelMain,
  planets: habitablePlanets,
  getAllPlanets,
  deleteAllPlanets,
}
