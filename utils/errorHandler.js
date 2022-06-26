//const log = require('./logger')

const errorHandler = (error, request, response, next) => {
  //remember error.name && 1st line of error msg!

  if (error.name === 'SequelizeValidationError') {
    return response
      .status(400)
      .send({error: error.errors.map((e) => e.message)})
  }
  if (error.name === 'InternalServerError') {
    return response.status(400).send({error: error.errors})
  }
  if (error.name === 'TypeError') {
    return response.send({error: error.errors})
  }
  if (error.name === 'MigrationError') {
    return response.status(400).send({error: error.errors})
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

module.exports = {errorHandler, unknownEndpoint}
