const logger = require("./logger")
const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

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
  } else if (error.name === "JsonWebTokenError") {    
    return response.status(401).json({      
      error: "invalid token"    
    })
  } else if (error.name === "TokenExpiredError") {    
    return response.status(401).json({      
      error: "token expired"    
    })
  }
  next(error) 
} 

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  if(authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    console.log(request.token)
    if (request.token !== undefined) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
      }
      request.user = await User.findById(decodedToken.id)
    } 
    next()
  } catch(error) {
    next(error)
  }
}
module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor
}