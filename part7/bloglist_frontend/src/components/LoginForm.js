import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

import { login } from '../reducers/loginReducer'
import ErrorNotification from './ErrorNotification'
import { H2, Input, P, Button, Main } from '../styles'

const LoginForm = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const sendLogin = event => {
		event.preventDefault()
		dispatch(login({
			username: username,
			password: password
		}))

		setUsername('')
		setPassword('')
	}

	return (
		user
			? <Redirect to='/blogs' />
			: <Main>
				<form onSubmit={sendLogin}>
					<H2>Log in to the application</H2>
					<ErrorNotification />
					<P>
						Username
						<Input id='inputUsername' value={username} type="text"
							onChange={({ target }) => setUsername(target.value)} />
					</P>
					<P>
						Password
						<Input id='inputPassword' value={password} type="password"
							onChange={({ target }) => setPassword(target.value)} />
					</P>
					<Button id='buttonLogin' type="submit">Login</Button>
				</form>
			</Main>
	)
}

export default LoginForm