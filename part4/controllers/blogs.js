const blogsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const Blogs = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const allBlogs = await Blogs.find({}).populate("user", { username: 1, name: 1})
  response.json(allBlogs.map(blog => blog.toJSON())) 
})
blogsRouter.get("/info", async (request, response) => {
  const allBlogs = await Blogs.find({}) 
  response.send(`Blog Directory has info for ${allBlogs.length} blogs.
    ${new Date()}`) 
})  
blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blogs.findById(request.params.id)  
  if (blog) {
    response.json(blog) 
  } else {
    response.status(404).end() 
  }
})
blogsRouter.post("/", async (request, response) => {
  const body = request.body 
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({error: "token missing or invalid"})
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id
  }) 
  const savedBlog = await blog.save()
  console.log(user)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog) 
}) 
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body 
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  } 
  const updatedBlog = await Blogs.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog) 
}) 
blogsRouter.delete("/:id", async (request, response, next) => {
  const token = request.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({error: "Token is invalid or missing"})
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if (user._id.toString() === blog.user.toString()) {
      await Blogs.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({error: "User is not permitted to delete the blog"}) 
    }
  } catch(error) {
    next()
  }
})
module.exports = blogsRouter

/* personsRouter.get("/:id", (request, response, next) => {
  Persons.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person.toJSON()) 
      } else {
        response.status(404).end() 
      }
    })
    .catch((error) => next(error)) 
}) 
personsRouter.post("/", (request, response, next) => {
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
personsRouter.put("/:id", (request, response, next) => {
  const body = request.body 
  const person = {
    name: body.name,
    number: body.number,
  } 
  Persons.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON()) 
    })
    .catch((error) => console.log(request.params.id) && next(error)) 
}) 
personsRouter.delete("/:id", (request, response, next) => {
  Persons.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end() 
    })
    .catch((error) => next(error)) 
}) */