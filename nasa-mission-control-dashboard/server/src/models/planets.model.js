const { parse } = require('csv-parse')
const path = require('path')
const fs = require('fs')

const { logger } = require('../constants')

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
      .on('data', (chunk) => {
        if (isHabitablePlanet(chunk)) {
          habitablePlanets.push(chunk)
        }
      })
      .on('error', (err) => {
        console.log(`Error reading file..${err}`)

        reject(err)
      })
      .on('end', () => {
        const planetNames = habitablePlanets.map((planet) => {
          return planet.kepler_name
        })
        // logger(`planets.model => habitablePlanets: ${planetNames}`)
        logger(
          `planets.model => ${habitablePlanets.length} habitable planets found`,
        )
        console.log('planets.model => Done, parsing csv data')

        resolve()
      })
  })
}

const planetsModelMain = async () => {
  await getAndParsePlanetsData('kepler_data.csv')
}

function getAllPlanets() {
  return habitablePlanets
}

module.exports = {
  planetsModelMain,
  planets: habitablePlanets,
  getAllPlanets,
}
