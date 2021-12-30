import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const combinedReducers = combineReducers({
	blogs: blogReducer,
	notification: notificationReducer,
	user: loginReducer,
	users: userReducer
})

const store = createStore(
	combinedReducers,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store