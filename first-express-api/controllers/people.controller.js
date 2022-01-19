const people = require('../models/people.model')

function getPeople(_req, res) {
  res.status(200).json(people)
}

function getPersonById(req, res) {
  const personId = +req.params.personId

  const person = people.find((person) => person.id === personId)

  if (person) {
    res.status(200).json(person)
  } else {
    res.status(404).send(`Person with id ${personId} not found`)
  }
}

function postPerson(req, res) {
  const person = req.body

  if (person.id && person.name && person.company) {
    people.push(person)
  } else {
    return res
      .status(400)
      .send('Invalid person. Please include only id, name and company')
  }

  console.log(`Adding person: ${person.name}`)
  res.status(201).json(person)
}

module.exports = {
  getPeople,
  getPersonById,
  postPerson,
}
