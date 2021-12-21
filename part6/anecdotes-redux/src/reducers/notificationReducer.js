const notificationReducer = (state=null, action) => {
	switch (action.type) {
	case 'SET_NOTIFICATION':
		return action.notification
	case 'RESET_NOTIFICATION':
		return action.notification
	default:
		return state
	}
}

export const showNotification = (notification, time) => {
	return async dispatch => {
		dispatch({
			type: 'SET_NOTIFICATION',
			notification
		})
		setTimeout(() => {
			dispatch({
				type: 'RESET_NOTIFICATION',
				notification: null
			})
		}, time*1000)
	}
}

export default notificationReducer