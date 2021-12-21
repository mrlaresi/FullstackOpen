import React from 'react'
import { useSelector } from 'react-redux'

import Anecdote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = () => {
	const filter = useSelector(state => state.filters)
	const selectedAnecdotes = useSelector(state => state.anecdotes
		.sort((first, second) => { return first.votes < second.votes }))
	const filteredAnecdotes = filter !== ''
		? selectedAnecdotes.filter(anecdote => anecdote.content.includes(filter))
		: selectedAnecdotes


	return (
		<>
			<Filter />
			{filteredAnecdotes.map(anecdote =>
				<Anecdote key={anecdote.id} anecdote={anecdote}/>
			)
			}
		</>
	)
}

export default AnecdoteList