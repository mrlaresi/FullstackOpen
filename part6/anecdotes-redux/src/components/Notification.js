import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}
	const element = props.notification.message
		? <p style={style}>{props.notification.message}</p>
		: <></>

	return (
		<>
			{ element }
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

const ConnectedNotification = connect(
	mapStateToProps
)(Notification)
export default ConnectedNotification