import React from 'react'
import { useSelector } from 'react-redux'

const ErrorNotification = () => {
	const message = useSelector(state => state.notification.message)
	const isError = useSelector(state => state.notification.isError)
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
		message
			? <p id='errorMessage' style={isError ? styleError : styleSuccess}>
				{message}
			</p>
			: <></>
	)
}

export default ErrorNotification