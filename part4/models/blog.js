const mongoose = require("mongoose")

/* const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number:{
    type: String,
    minlength: 8,
    required: true
  }
}) */

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required:  true,
    minlength: 5
  },
  author: {
    type: String,
    required:  true,
    minlength: 5
  },
  url: {
    type: String,
    required:  true,
    minlength: 5
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {    
    type: mongoose.Schema.Types.ObjectId,    
    ref: "User"  
  }
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

//module.exports = mongoose.model("Persons", personSchema)
const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog
