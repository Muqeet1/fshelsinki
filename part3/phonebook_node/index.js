const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors())
//Using morgan and uuid to assign each request with unique uuid for logs
morgan.token("id", function getId(req) {
  return "req-id:" + req.id;
});
morgan.token("content-body", (req, res) => {
  if (req.method == "POST") return JSON.stringify(req.body);
  return " ";
});

//single token accessible example
//morgan.token('personname', function (req, res) { return req.body.name });
//morgan.token('personnumber', function (req, res) { return req.body.number });

app.use(assignReqId);
app.use(morgan(":id, :method, :url, :response-time :content-body"));
function assignReqId(req, res, next) {
  req.id = uuidv4();
  next();
}

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return Math.floor(Math.random(maxId) * 1000000);
};
const peopleInfo = `Phonebook has info for ${persons.length} people.
${new Date()}`;

app.get("/", (request, response) => {
  response.send("<p>Hello World!</p>");
});
app.get("/info", (request, response) => {
  response.send(peopleInfo);
});
app.get("/api/persons/", (request, response) => {
  response.send(persons);
});
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id == id);
  if (person) {
    response.send(person);
  } else {
    response.statusMessage = "Not found";
    response.status(404).end();
  }
});
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const personName = persons.map((person) => person.name); //TODO: add to lowercase
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number cannot be empty!",
    });
  } else if (personName.includes(body.name)) {
    return response.status(400).json({
      error: "Name must be unique!",
    });
  } else {
    const person = {
      name: body.name,
      number: body.number,
      // date: new Date(),
      id: generateId(),
    };
    persons = persons.concat(person);
    return response.status(200).json(persons);
  }
});
app.put("/api/persons/:id", (request, response) => {
  const body = request.body;
  const id = Number(request.params.id);
  const personId = persons.filter((person) => person.id !== id);
  const personExist = persons.find(
    (person) => person.name === body.name
  );
  if (personId) {
    const person = {
     ...personExist,
      number: body.number,
    };
    return response.status(200).json(person);
  } else {
    return response.status(400).json({
      error: "Content is Missing!",
    });
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.filter((person) => person.id !== id);
  if (person) {
    response.send(person);
  } else {
    return response.status(400).json({
      error: "Content is Missing!",
    });
  }
});

//Leaving this block for future references
/* app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note => note.id == id)
  
  if (note) {
    response.json(note)
  } else {
    response.statusMessage = "Not found";
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
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end('Hello World!'));
  //if Json ? parse : auto = OK, cuz this old method in node
});
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
 */

const unknownEndpoint = (request, response) => {
  console.log("Endpoint does not exist!");
  response.status(404).send({ error: "Unknown endpoint" });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
