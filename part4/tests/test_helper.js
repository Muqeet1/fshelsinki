const Blogs = require("../models/blog")
const User = require("../models/user")
const initialBlogs = [
  {    
    title: "Testdsad saa",
    author: "jest tessdats",
    url: "http://localhost:3001/api/blogs",
    likes: 23,
  },  
  {    
    title: "jester tester",
    author: "testing jester",
    url: "http://localdahost:3001/api/blogs",
    likes: 9,
  },
  {    
    title: "jesewqewqter tester",
    author: "tedsadsting jester",
    url: "http:/asdd/localhost:3001/api/blogs",
    likes: 234,
  },
]
  
const nonExistingId = async () => {
  const blog = new Blogs({ title: "existing id test", author: "testing jester", url: "http://localhost:3001/api/blogs", likes: 5 })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}
const blogsInDb = async () => {
  const blogs = await Blogs.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}