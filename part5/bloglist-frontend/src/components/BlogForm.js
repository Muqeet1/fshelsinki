import React from 'react'

const BlogForm = ({ handleBlogChange, createBlog }) => {
    return (
        <div className="blogsform">
            <form id="blogform" onSubmit={createBlog}>
                <label>
          Title:
                    <input type="text" name="title" id="title" onChange={handleBlogChange} />
                </label>
                <br />
                <label>
          Author:
                    <input type="text" name="author" id="author" onChange={handleBlogChange} />
                </label>
                <br />
                <label>
          Url:
                    <input type="text" name="url" id="url" onChange={handleBlogChange} />
                </label>
                <br />
                <label>
          Likes:
                    <input type="number" name="likes" onChange={handleBlogChange} />
                </label>
                <br />
                <input id="submit-button" type="submit" />
            </form>
        </div>
    )
}
export default BlogForm
