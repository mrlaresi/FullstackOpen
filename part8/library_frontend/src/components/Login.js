import React, { useState } from 'react'

const Login = ({ show, login }) => {
	if (!show) {
		return null
	}

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const submit = (e) => {
		e.preventDefault()
		login({ variables: { username, password } })
		setUsername('')
		setPassword('')
	}

	return (
		<form onSubmit={submit}>
			<div>Username <input value={username} type='text' onChange={({ target }) => setUsername(target.value)} /></div>
			<div>Password <input value={password} type='password' onChange={({ target }) => setPassword(target.value)} /></div>
			<button type='submit'>Login</button>
		</form>
	)
}

export default Login