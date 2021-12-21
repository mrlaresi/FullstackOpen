const initialNotification = {
	message: null,
	timeout: null
}

const notificationReducer = (state=initialNotification, action) => {
	switch (action.type) {
	case 'SET_NOTIFICATION':
		if (state.timeout) {
			clearTimeout(state.timeout)
		}
		return action.data
	case 'RESET_NOTIFICATION':
		return action.notification
	default:
		return state
	}
}

export const showNotification = (message, time) => {
	return async dispatch => {
		dispatch({
			type: 'SET_NOTIFICATION',
			data: {
				message,
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