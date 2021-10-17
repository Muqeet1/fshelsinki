const config = require("./utils/config")
const express = require("express")
const loginRouter = require("./controllers/login")
require("express-async-errors")
const app = express()
const logger = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const middleware = require("./utils/middleware")
//const { v4: uuidv4 } = require("uuid")
const cors = require("cors")
const mongoose = require("mongoose")

logger.info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app