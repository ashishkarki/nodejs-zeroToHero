const faker = require('@faker-js/faker')

const EXPRESS_PORT = process.env.PORT || 5001

const HOW_MANY_RANDOM_PEOPLE = 5

const URI_PATHS = {
  PEOPLE: '/people',
  MESSAGES: '/messages',
  PUBLIC: './public',
}

const generateRandomPeople = (howMany = HOW_MANY_RANDOM_PEOPLE) => {
  const people = []

  for (let i = 0; i < howMany; i++) {
    people.push({
      id: faker.datatype.number(),
      name: faker.name.findName(),
      company: faker.company.companyName(),
    })
  }

  return people
}

module.exports = {
  EXPRESS_PORT,
  URI_PATHS,
  generateRandomPeople,
}
