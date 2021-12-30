import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
import UserTable from './components/UserTable'
import ErrorNotification from './components/ErrorNotification'
import User from './components/User'

import blogService from './services/blogs'
import { setUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/userReducer'
import { H2, Main } from './styles'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const userMatch = useRouteMatch('/users/:id')
	const blogMatch = useRouteMatch('/blogs/:id')

	useEffect(() => {
		const blogAppUser = window.localStorage.getItem('blogAppUser')
		if (blogAppUser) {
			const user = JSON.parse(blogAppUser)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		}
		dispatch(initializeBlogs())
		dispatch(getUsers())
	}, [])

	return (
		user
			? <>
				<Navigation />
				<Main>
					<H2>Blog app</H2>
					<ErrorNotification />
					<Switch>
						<Route path='/users/:id'>
							<User userMatch={userMatch} />
						</Route>
						<Route path='/users'>
							<UserTable />
						</Route>
						<Route path='/blogs/:id'>
							<Blog blogMatch={blogMatch} />
						</Route>
						<Route path='/'>
							<BlogsList />
						</Route>
					</Switch>
				</Main>
			</>
			: <LoginForm />
	)
}

export default App