const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
describe("when there is initially some blogs saved", () => {
  console.log("Started Tests!")
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test("a specific title is within the returned blogs", async () => {
    const response = await api.get("/api/blogs")
    const titles = response.body.map((r) => r.title)
    expect(titles).toContain("jester tester")
  })
})
describe("viewing a specific blog", () => {
  test("all blogs have id", async () => {
    const blogs = await helper.blogsInDb()
    for(let blog of blogs) {
      expect(blog.id).toBeDefined()
    }
  })
  test("succeeds with valid id", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogsToView = blogsAtStart[0]
    const resultBlog = await api    
      .get(`/api/blogs/${blogsToView.id}`)    
      .expect(200)    
      .expect("Content-Type", /application\/json/)

    expect(resultBlog.body).toEqual(blogsToView)
  })
  test("fails with status code 400 if blog doesnot have id", async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })
  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445"
    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})
describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "async/await simplifies making async calls",
      author: "new blog adding test",
      url: "http://localhost:3001/api/blogs",
      likes: 63,
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    const blogsTitles = response.map((r) => r.title)
    expect(blogsTitles).toContain("async/await simplifies making async calls")
  })
  test("blogs with likes undefined have default zero value", async () => {
    const newBlog = {    
      title: "manchester tester",
      author: "testing likes",
      url: "http://localhost:3001/api/blogs/",
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)
    const response = await helper.blogsInDb()
    const result = response.filter((r) => r.title === newBlog.title) 
    expect(result[0].likes).toBeDefined()
  })
  test("blog without title and url is not added", async () => {
    const newBlog = {
      author: "App Tester",
      likes: 9
    }
    await api.post("/api/blogs")
      .send(newBlog)
      .expect(400)
    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
  })
})
describe("deletion of a blog", () => {
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api    
      .delete(`/api/blogs/${blogToDelete.id}`)    
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title[0])
  })
})
afterAll(() => {
  console.log("Finished Tests!")
  mongoose.connection.close()
})
