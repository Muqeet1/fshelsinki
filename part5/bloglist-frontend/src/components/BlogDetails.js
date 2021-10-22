import React from 'react'
const BlogDetails = ({ blog }) => {
    return (
        <>
            {blog.author} {blog.title} {blog.url} {blog.likes}
        </>
    )
}
export default BlogDetails
