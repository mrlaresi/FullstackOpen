import React from "react"
import ErrorNotification from "./ErrorNotification"
const Login = ({ handleLogin, username, setUsername, password, setPassword, message, isError }) => {
	return (
		<div>
			<form onSubmit={handleLogin}>
				<h2>Log in to the application</h2>
				<ErrorNotification message={message} isError={isError} />
				<p>
					Username
					<input value={username} type="text"
						onChange={({ target }) => setUsername(target.value)} />
				</p>
				<p>
					Password
					<input value={password} type="password"
						onChange={({ target }) => setPassword(target.value)} />
				</p>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login