const initialNotification = {
	message: null,
	isError: false,
	timeout: null
}

const notificationReducer = (state=initialNotification, action) => {
	switch (action.type) {
	case 'SET_NOTIFICATION':
		return action.data
	case 'RESET_NOTIFICATION':
		return action.notification
	default:
		return state
	}
}

export const showNotification = (message, isError, time) => {
	return async dispatch => {
		dispatch({
			type: 'SET_NOTIFICATION',
			data: {
				message,
				isError,
				timeout: setTimeout(() => {
					dispatch({
						type: 'RESET_NOTIFICATION',
						notification: initialNotification
					})
				}, time*1000)
			}
		})
	}
}

export default notificationReducer