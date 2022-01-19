const express = require('express')

const peopleController = require('../controllers/people.controller')

const peopleRouter = express.Router()

// the paths
peopleRouter.get('/', peopleController.getPeople)
peopleRouter.get('/:personId', peopleController.getPersonById)
peopleRouter.post('/', peopleController.postPerson)

module.exports = peopleRouter
