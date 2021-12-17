import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ErrorNotification from './ErrorNotification'

const LoginForm = ({ handleLogin, message, isError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired
  }

  const sendLogin = event => {
    event.preventDefault()
    handleLogin({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={sendLogin}>
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
  )
}

export default LoginForm