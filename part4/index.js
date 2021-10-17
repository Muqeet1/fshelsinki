const app = require("./app")
const http = require("http")
const config = require("./utils/config")
const logger = require("./utils/logger")

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`) 
}) 

/* const morgan = require("morgan")
const { v4: uuidv4 } = require("uuid")
// eslint-disable-next-line no-unused-vars
//const Persons = require("./models/person")
app.use(assignReqId)
app.use(morgan(":id, :method, :url, :response-time :content-body"))
function assignReqId(req, res, next){
  req.id = uuidv4()
  next() 
}

//Using morgan and uuid to assign each request with unique uuid for logs
morgan.token("id", function getId(req) {
  return "req-id:" + req.id 
}) 
// eslint-disable-next-line no-unused-vars
morgan.token("content-body", (req, res) => {
  if (req.method == "POST") return JSON.stringify(req.body) 
  return " " 
}) 
 */
//single token accessible example
//morgan.token('personname', function (req, res) { return req.body.name }) 
//morgan.token('personnumber', function (req, res) { return req.body.number }) 
/* const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0 
  return Math.floor(Math.random(maxId) * 1000000) 
}  */



//Leaving this block for future references
/* app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note => note.id == id)
  
  if (note) {
    response.json(note)
  } else {
    response.statusMessage = "Not found" 
    response.status(404).end()
  }
}) */

/* app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note=> note.id == id)
  response.status(204).end()
} ) */
/*
//node module http request method
const http = require('http')
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" }) 
  response.end('Hello World!')) 
  //if Json ? parse : auto = OK, cuz this old method in node
}) 
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
 */
// this has to be the last loaded middleware.