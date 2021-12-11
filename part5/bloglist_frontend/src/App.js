import React, { useState, useEffect } from 'react'

import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)
	const [errorMessage, setError] = useState(null)
	const [isError, setIsError] = useState(false)

	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const blogAppUser = window.localStorage.getItem('blogAppUser')
		if (blogAppUser) {
			const user = JSON.parse(blogAppUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})
			setUser(user)
			setUsername("")
			setPassword("")
			window.localStorage.setItem("blogAppUser", JSON.stringify(user))
			blogService.setToken(user.token)
		} catch (exception) {
			setError("Wrong username or password")
			setIsError(true)
			setTimeout(() => {
				setError(null)
			}, 5000)
		}
	}

	const handleLogout = () => {
		setUser(null)
		window.localStorage.removeItem('blogAppUser')
	}

	const handleCreate = async event => {
		event.preventDefault()
		try {
			const blog = {
				title: title,
				author: author,
				url: url
			}
			const response = await blogService.create(blog)
			setBlogs(blogs.concat(response))
			setError(`A new blog '${title}' by ${author} added`)
			setIsError(false)
			setTimeout(() => {
				setError(null)
			}, 5000)
		} catch (exception) {
			setError("Unable to post new blog")
			setIsError(true)
			setTimeout(() => {
				setError(null)
			}, 5000)
		}
	}

	if (user === null) {
		return (
			<div>
				<Login handleLogin={handleLogin}
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword} 
				message={errorMessage}
				isError={isError} />
			</div>
		)
	}
	return (
		<div>
			<Blogs blogs={blogs} 
				handleLogout={handleLogout} handleCreate={handleCreate}
				user={user.name}
				title={title} 
				setTitle={setTitle} 
				author={author}
				setAuthor={setAuthor}
				url={url}
				setUrl={setUrl}
				message={errorMessage}
				isError={isError} />
		</div>
	)
}

export default App