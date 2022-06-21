const log = require('./logger')

const errorHandler = (error, request, response, next) => {
  log.error(error)
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {errorHandler, unknownEndpoint}