const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


//when call next(err) , this code down below will be executed
// In Express, any middleware with 4 parameters (error, req, res, next) is recognized as an error-handling middleware.
// CastError usually happens in Mongoose when you try to query MongoDB with an invalid ObjectId (e.g., 123abc).
// ValidationError is a Mongoose error when saving a document fails validation (e.g., required field missing, string doesn’t match a pattern, etc.).
const errorHandler = (error, req, res, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  // if the error is not recognized, pass it to the other error handler
  next(error)
}



module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}

// define a token called body, the return value of the callback function will be assigned to the body token
// morgan.token('body', (request) => {
//   return request.method === 'POST' ? JSON.stringify(request.body) : ''
// })
// // the  parameter in morgan defines the format of the log
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))