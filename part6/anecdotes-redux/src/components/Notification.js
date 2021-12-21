import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notifications)
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}
	const element = notification
		? <p style={style}>{notification}</p>
		: <></>

	return (
		<>
			{ element }
		</>
	)
}

export default Notification