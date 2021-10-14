require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const { v4: uuidv4 } = require("uuid")
const cors = require("cors")
// eslint-disable-next-line no-unused-vars
const mongoose = require("mongoose")
const Persons = require("./models/person")

const app = express()
app.use(express.static("build"))
app.use(express.json())
app.use(cors())
app.use(assignReqId)
app.use(morgan(":id, :method, :url, :response-time :content-body"))
function assignReqId(req, res, next){
  req.id = uuidv4()
  next() 
}

//single token accessible example
//morgan.token('personname', function (req, res) { return req.body.name }) 
//morgan.token('personnumber', function (req, res) { return req.body.number }) 

//Using morgan and uuid to assign each request with unique uuid for logs
morgan.token("id", function getId(req) {
  return "req-id:" + req.id 
}) 
// eslint-disable-next-line no-unused-vars
morgan.token("content-body", (req, res) => {
  if (req.method == "POST") return JSON.stringify(req.body) 
  return " " 
}) 
/* const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0 
  return Math.floor(Math.random(maxId) * 1000000) 
}  */

app.get("/", (request, response) => {
  response.send("<p>Hello World!</p>") 
}) 
app.get("/info", (request, response) => {
  Persons.find({}).then((persons) => {
    const peopleInfo = `Phonebook has info for ${persons.length} people.
  ${new Date()}` 
    response.send(peopleInfo) 
  }) 
}) 
app.get("/api/persons", (request, response) => {
  Persons.find({}).then((persons) => {
    response.json(persons) 
  }) 
}) 
app.get("/api/persons/:id", (request, response, next) => {
  Persons.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person) 
      } else {
        response.status(404).end() 
      }
    })
    .catch((error) => next(error)) 
}) 
app.post("/api/persons", (request, response, next) => {
  const body = request.body 
  const person = new Persons({
    name: body.name,
    number: body.number,
  }) 
  person
    .save()
    .then((result) => {
      response.json(result.toJSON()) 
    })
    .catch((error) => next(error)) 
}) 
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body 
  const person = {
    name: body.name,
    number: body.number,
  } 
  Persons.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      console.log(request.params.id) 
      response.json(updatedPerson.toJSON()) 
    })
    .catch((error) => console.log(request.params.id) && next(error)) 
}) 
app.delete("/api/persons/:id", (request, response, next) => {
  Persons.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end() 
    })
    .catch((error) => next(error)) 
}) 

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

const unknownEndpoint = (request, response) => {
  console.log("Endpoint does not exist!") 
  response.status(404).send({ error: "Unknown endpoint" }) 
} 
app.use(unknownEndpoint) 
const errorHandler = (error, request, response, next) => {
  console.error(error.message) 

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" }) 
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message }) 
  }
  next(error) 
} 
// this has to be the last loaded middleware.
app.use(errorHandler) 

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) 
}) 
