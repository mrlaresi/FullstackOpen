import React from 'react'

const ErrorNotification = ({ message, isError }) => {
  if (!message) return null
  const base = {
    border: 'thick double',
    padding: '1em',
    backgroundColor: 'lightgray',
    fontStyle: 'italic',
    fontSize: 16
  }
  const styleError = { ...base, color: 'red', borderColor: 'red' }
  const styleSuccess = { ...base, color: 'green', borderColor: 'green' }

  return (
    <p style={isError ? styleError : styleSuccess}>
      {message}
    </p>
  )
}

export default ErrorNotification