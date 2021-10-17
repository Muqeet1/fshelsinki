const lists = require("../utils/list_helper")

test("Dummy returns one", () => {
  const blogs = []
  const result = lists.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Mary Elizabeth",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 55,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 240,
      __v: 0
    }
  ]
  
  test("when list has only one blog, equals the likes of that", () => {
    const result = lists.totalLikes(listWithOneBlog)
    expect(result).toBe(300)
  })
  test("find blog with most likes", () => {
    const result = lists.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      "Title": listWithOneBlog[2].title,
      "Author": listWithOneBlog[2].author,
      "Likes": listWithOneBlog[2].likes})
  })
  test("find most blogs writer", () => {
    const result = lists.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      "Author": listWithOneBlog[2].author,
      "Blogs": 2})
  })
  test("Author with most likes", () => {
    const result = lists.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      "Author": listWithOneBlog[2].author,
      "Likes": listWithOneBlog[2].likes})
  })
})