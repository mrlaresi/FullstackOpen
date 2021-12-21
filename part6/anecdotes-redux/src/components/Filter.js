import React from 'react'
import { useDispatch } from 'react-redux'

import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
	const dispatch = useDispatch()
	const handleChange = (event) => {
		dispatch(changeFilter(event.target.value))
	}
	const style = {
		marginBottom: 10
	}

	return (
		<div style={style}>
			Filter <input onChange={handleChange}></input>
		</div>
	)
}

export default Filter