import loginService from '../services/login'
import blogService from '../services/blogs'

import { showNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
	switch (action.type) {
	case 'SET_USER':
		return action.user
	default:
		return state
	}
}



export const setUser = (user) => {
	return {
		type: 'SET_USER',
		user
	}
}

export const login = (userObject) => {
	return async dispatch => {
		try {
			const user = await loginService.login(userObject)
			console.log(user)
			window.localStorage.setItem('blogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			dispatch({
				type: 'SET_USER',
				user
			})
		} catch (e) {
			console.log(e)
			dispatch(showNotification('Wrong username or password', true, 5))
		}
	}
}

export const logout = () => {
	window.localStorage.setItem('blogAppUSer', null)
	blogService.setToken(null)
	return {
		type: 'SET_USER',
		user: null
	}
}

export default loginReducer