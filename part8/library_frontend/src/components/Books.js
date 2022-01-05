import React, { useState } from 'react'
import BookTable from './BookTable'

const Books = ({ show }) => {
	const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([''])
	const [genresSet, setBool] = useState(false)

	if (!show) {
		return null
	}

	const setGenreArray = (g) => {
		setGenres(genres.concat(g))
		setBool(true)
	}

	return (
		<div>
			<h2>Books</h2>
			<select value={genre} onChange={({ target }) => setGenre(target.value)}>
				{genres.map(g =>
					<option key={g} value={g}>{g}</option>
				)}
			</select>
			<button value='' onClick={({ target }) => { setGenre(target.value) }}>Reset genres</button>
			<BookTable genre={genre} setGenreArray={setGenreArray} genresSet={genresSet} />
		</div>
	)
}

export default Books