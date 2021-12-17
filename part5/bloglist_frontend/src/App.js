import React, { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setError] = useState(null)
  const [isError, setIsError] = useState(false)

  const [createVisible, setCreateVisible] = useState(false)

  const blogFormRef = useRef()


  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((first, second) => {
        return second.likes - first.likes
      }))
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const blogAppUser = window.localStorage.getItem('blogAppUser')
    if (blogAppUser) {
      const user = JSON.parse(blogAppUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async rawUser => {
    try {
      const user = await loginService.login(rawUser)
      setUser(user)
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      changeError('Wrong username or password', true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blogAppUser')
  }

  const handleShowCreate = () => {
    setCreateVisible(true)
  }

  const handleCreate = async rawBlog => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(rawBlog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      changeError(`A new blog '${rawBlog.title}' by ${rawBlog.author} added`, false)
      setCreateVisible(false)
    } catch (exception) {
      changeError('Login timed out. Please login again.', true)
      setUser(null)
      window.localStorage.removeItem('blogAppUser')
    }
  }

  const handleLike = async rawBlog => {
    try {
      const updated = { ...rawBlog, likes: rawBlog.likes += 1, user: rawBlog.user.id }
      await blogService.update(updated)

      const newBlogs = blogs.map(blog => blog.id !== rawBlog.id ? blog : { ...updated, user: rawBlog.user })
      newBlogs.sort((first, second) => {
        return second.likes - first.likes
      })
      setBlogs(newBlogs)
    } catch (exception) {
      changeError('Encountered an error whilst trying to add like.', true)
    }
  }

  const handleDelete = async blog => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
        await blogService.remove(blog)
        setBlogs(blogs.filter(element => element.id !== blog.id))
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  const changeError = (message, bool) => {
    setError(message)
    setIsError(bool)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <LoginForm handleLogin={handleLogin}
        message={errorMessage}
        isError={isError} />
    )
  }
  return (
    <Blogs blogs={blogs}
      handleLogout={handleLogout}
      handleCreate={handleCreate}
      handleShowCreate={handleShowCreate}
      handleLike={handleLike}
      handleDelete={handleDelete}
      blogFormRef={blogFormRef}
      user={user}
      message={errorMessage}
      isError={isError}
      createVisible={createVisible} />
  )
}

export default App