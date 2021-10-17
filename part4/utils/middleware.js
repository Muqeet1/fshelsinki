const logger = require("./logger")
const { v4: uuidv4 } = require("uuid")

function assignReqId(request){
  return request.id = uuidv4()
}
const requestLogger = (request, response, next) => {
  logger.info("Request-Id:", assignReqId(request))
  logger.info("Method:", request.method)
  logger.info("Path:  ", request.path)
  logger.info("Body:  ", request.body)
  logger.info("---")
  next()
}

const unknownEndpoint = (request, response) => {
  logger.info("Endpoint does not exist!") 
  response.status(404).send({ error: "Unknown endpoint" }) 
} 
  
const errorHandler = (error, request, response, next) => {
  console.error(error.message) 
  
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" }) 
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message }) 
  }
  next(error) 
} 

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger
}