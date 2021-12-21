import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
	const addAnecdote = async event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		props.createAnecdote(content)
		props.showNotification(`New anecdote has been added: ${content}`, 5)
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='anecdote' /></div>
				<button type='submit'>create</button>
			</form>
		</>
	)
}

const mapDispatchToProps = {
	createAnecdote,
	showNotification
}

const ConnectedForm = connect(
	null,
	mapDispatchToProps
)(AnecdoteForm)

export default ConnectedForm