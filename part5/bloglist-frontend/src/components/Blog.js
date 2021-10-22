import React, { useState } from 'react'
import blogsService from '../services/blogs'
const Blog = ({ blog, getAll }) => {
    const [visible, setVisible] = useState(false)
    const detailStyle = { display: visible ? '' : 'none' }
    const blogStyle = {
        padding: 5,
        paddingTop: 20,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 10,
        position: 'relative',
    }

    const addLike = async (blog) => {
        blog.likes = blog.likes + 1
        console.log(blog.likes)
        try {
            await blogsService.update(blog)
            getAll()
        } catch (exception) {
            console.error(exception)
        }
    }
    const deleteBlog = async (blog) => {
        const confirmToDelete = window.confirm(
            `Are you sure you want to delete ${blog.title} created by ${blog.user.name}?`
        )
        if (confirmToDelete) {
            try {
                await blogsService.blogsDelete(blog)
                getAll()
            } catch (exception) {
                console.error(exception)
            }
        }
    }
    return (
        <div>
            <div className="blog" style={blogStyle} key={blog.id}>
                <p className="blog-title"> {blog.title} </p>
                <button id="blog-id" onClick={() => setVisible(!visible)}>
                    {visible ? 'hide' : 'show'}
                </button>
                <div className="blog-details" style={detailStyle}>
                    <p className="blog-author">{blog.author}</p>
                    <p>{blog.url}</p>
                    <p id="blog-likes">
                        {blog.likes} likes
                        <button onClick={() => addLike(blog)}>
                            like
                        </button>
                    </p>
                    {blog.user && <p>added by {blog.user.name}</p>}
                    <button onClick={() => deleteBlog(blog)}>remove</button>
                </div>
            </div>
        </div>
    )
}

export default Blog
