const _ = require("lodash")

const dummy = blogs => {
  return blogs ? 1 : 0
}

const totalLikes = blogs => {
  const reducer = blogs.map(blog => blog.likes).reduce((a, b) => a + b, 0)
  return reducer
}
const favoriteBlog = blogs => {
  const favorite = blogs.reduce((favBlog, curBlog) => {
    return favBlog.likes < curBlog.likes ? curBlog : favBlog
  })
  return ({
    "Title": favorite.title,
    "Author": favorite.author,
    "Likes": favorite.likes
  })
}
const mostBlogs = blogs => {
  const authors = blogs.map(blog => blog.author)
  const result = authors.sort((a,b) => {
    authors.filter(v => v===a).length -
    authors.filter(v => v===b).length
  }).pop()
  const checkOccurence = authors.map(authorName => authorName.author === result).length
  return ({
    "Author": result,
    "Blogs": checkOccurence
  })
}
const mostLikes = blogs => {
  const likes = blogs.map(blog => (blog.likes))
  const likedAuthor = blogs.find(blog => blog.likes === _.max(likes))
  return ({
    "Author": likedAuthor.author,
    "Likes": _.max(likes)
  })
}
/*  const authors = _.maxBy(blogs, function(o){return o.author}).author
  const count = _.countBy(blogs, function(o){return o.author == authors}).false
  console.log(authors, "author", count, "count")
  return authors    */ 


/* const mostLikedAuthor = blogs => {
    let mostLikes = 0
    let blogIndex = 0
    blogs.map(blog, index) =>
} */
module.exports = { 
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}