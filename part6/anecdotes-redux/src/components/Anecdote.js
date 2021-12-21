import React from 'react'
import { useDispatch } from 'react-redux'

import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
	const dispatch = useDispatch()

	const vote = (id) => {
		dispatch(addVote(id))
		dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
	}

	return (
		<>
			<div>
				{anecdote.content}
				<br/>
				has {anecdote.votes}
				<button onClick={() => vote(anecdote.id)}>vote</button>
			</div>
		</>
	)
}

export default Anecdote