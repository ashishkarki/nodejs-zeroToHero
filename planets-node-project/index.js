const { parse } = require('csv-parse')
const path = require('path')
const fs = require('fs')

const habitablePlanets = []

const isHabitablePlanet = (planet) => {
  return (
    planet.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  )
}

const getAndParseData = (filePath) => {
  const fsStream = fs.createReadStream(path.join(__dirname, filePath))

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
    })
    .on('end', () => {
      const planetNames = habitablePlanets.map((planet) => {
        return planet.kepler_name
      })
      console.log(planetNames)
      console.log(`${habitablePlanets.length} habitable planets found`)
      console.log('Done, parsing csv data')
    })
}

const main = () => {
  getAndParseData('./data/kepler_data.csv')
}

main()
