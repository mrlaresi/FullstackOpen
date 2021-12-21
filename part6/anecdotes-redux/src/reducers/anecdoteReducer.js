import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (state=[], action) => {
	switch (action.type) {
	case 'VOTE': {
		return state.map((anecdote) => {
			return anecdote.id === action.data.id
				? action.data
				: anecdote
		})
	}
	case 'NEW_ANECDOTE':
		return state.concat(action.data)
	case 'INIT_ANECDOTES':
		return action.data
	default:
		return state
	}
}

export const addVote  = id => {
	return async dispatch => {
		const voted = await anecdotesService.addVote(id)
		dispatch({
			type: 'VOTE',
			data: voted
		})
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdotesService.createNew(content)
		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote
		})
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdotesService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes
		})
	}
}

export default anecdoteReducer