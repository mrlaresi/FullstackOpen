import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeAnecdotes())
	}, [])

	return (
		<>
			<h2>Anecdotes</h2>
			<Notification />
			<AnecdoteList />
			<AnecdoteForm />
		</>
	)
}

export default App