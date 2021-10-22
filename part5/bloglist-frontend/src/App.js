import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginDisplay from './components/LoginDisplay'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Login from './components/Login'
import './index.css'
const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState({ message: '', type: '' })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
        likes: 0,
    })

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const getBlogs = () => {
        blogService.getAll().then((blogs) => {
            if (user) {
                const userBlogs = blogs.filter(
                    (blog) => blog.user.username === user.username
                )
                setBlogs(userBlogs)
            }
        })
    }
    useEffect(getBlogs, [user])

    useEffect(() => {
        async function logInUser() {
            const loggedInUser = window.localStorage.getItem('loggedInUser')
            if (loggedInUser) {
                const user = JSON.parse(loggedInUser)
                setUser(user)
                blogService.setToken(user.token)
            }
        }
        logInUser()
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService({
                username,
                password,
            })
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessage({
                type: 'msg',
                message: `${user.username} Logged in Successfully`,
            })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            setMessage({ type: 'error', message: 'Wrong Credentials' })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }
    const handleLogOut = () => {
        window.localStorage.removeItem('loggedInUser')
        setBlogs(null)
        setUser(null)
        setMessage({ type: 'msg', message: 'Logged out Successfully' })
        setTimeout(() => {
            setMessage(null)
        }, 2000)
    }

    const handleBlogChange = (e) => {
        setNewBlog({ ...newBlog, [`${e.target.name}`]: e.target.value })
    }

    const createBlog = async (event) => {
        event.preventDefault()
        try {
            await blogService.create(newBlog)
            getBlogs()
            setMessage({
                type: 'msg',
                message: `A new blog ${newBlog.title} by ${newBlog.author} added Successfully`,
            })
            setInterval(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            setMessage({ type: 'msg', message: exception })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    if (user === null) {
        return (
            <>
                <Notification message={message} />
                <Login
                    username={username}
                    password={password}
                    handleUsername={handleUsername}
                    handlePassword={handlePassword}
                    handleLogin={handleLogin}
                />
            </>
        )
    }
    if(blogs) {
        return (
            <div>
                <Notification message={message} />
                <div>
                    <LoginDisplay user={user} handleLogout={handleLogOut} />
                    <h2>Blogs</h2>
                    {blogs
                        .sort((a, b) => (a.likes > b.likes ? -1 : +1))
                        .map((blog, index) => (
                            <>
                                <Blog
                                    blog={blog}
                                    key={index}
                                    getAll={() => getBlogs()}
                                ></Blog>
                            </>
                        )) }
                </div>

                <Togglable buttonLabel="Create New Blog">
                    <BlogForm handleBlogChange={handleBlogChange} createBlog={createBlog} />
                </Togglable>
            </div>
        )
    } return 'loading...'
}

export default App
