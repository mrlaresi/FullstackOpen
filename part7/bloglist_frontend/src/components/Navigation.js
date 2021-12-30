import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reducers/loginReducer'
import { Nav, Button, Li } from '../styles'

const Navigation = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const handleLogout = () => {
		dispatch(logout())
		window.localStorage.removeItem('blogAppUser')
	}

	return (
		<nav>
			<Nav>
				<li><Link to='/blogs'>Blogs</Link></li>
				<li><Link to ='/users'>Users</Link></li>
				<Li>{user.name} logged in</Li>
				<li><Button onClick={handleLogout}>Logout</Button></li>
			</Nav>
		</nav>
	)
}

export default Navigation