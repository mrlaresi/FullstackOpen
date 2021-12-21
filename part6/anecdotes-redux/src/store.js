import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import anecdoteReducer from './reducers/anecdoteReducer.js'
import notificationReducer from './reducers/notificationReducer.js'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notifications: notificationReducer,
	filters: filterReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store