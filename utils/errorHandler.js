//const log = require('./logger')

const errorHandler = (error, request, response, next) => {
  //remember error.name && 1st line of error msg!
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({error: 'username must be an email.'})
  }
  if (error.name === 'TypeError') {
    return response
      .status(400)
      .send({error: 'parameter is null. please input valid parameters.'})
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

module.exports = {errorHandler, unknownEndpoint}
