const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  )
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.obcuo.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url)
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Persons = mongoose.model("Persons", personSchema)
if (process.argv.length == 3) {
  Persons.find({}).then((result) => {
    console.log("Phonebook:")
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
if (process.argv.length > 3) {
  const person = new Persons({
    name: personName,
    number: personNumber,
  })

  person.save().then(() => {
    console.log("Person saved!")
    mongoose.connection.close()
  })
}