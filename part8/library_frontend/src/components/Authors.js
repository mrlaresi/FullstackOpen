import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'

const Authors = ({ show }) => {
	const authors = useQuery(ALL_AUTHORS)
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')
	const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }]
	})


	if (!show) {
		return null
	}

	const changeBorn = async (e) => {
		e.preventDefault()

		setBirthyear({
			variables: {
				name,
				setBornTo: Number(born)
			}
		})

		setName('')
		setBorn('')
	}

	const sortAuthors = (authors) => {
		return [...authors].sort((a, b) => {
			const bookCount = b.bookCount - a.bookCount
			if (bookCount !== 0)
				return bookCount
			if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
			if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
			return 0
		})
	}

	return (
		<div>{authors.loading
			? <p>Loading...</p>
			: <>
				<h2>Authors</h2>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>
								Born
							</th>
							<th>
								Books
							</th>
						</tr>
						{sortAuthors(authors.data.allAuthors).map(a =>
							<tr key={a.name}>
								<td>{a.name}</td>
								<td>{a.born}</td>
								<td>{a.bookCount}</td>
							</tr>
						)}
					</tbody>
				</table>
				<h2>Set birthyear</h2>
				<form onSubmit={changeBorn}>
					<select value={name} onChange={({ target }) => setName(target.value)}>
						{authors.data.allAuthors.map(a =>
							<option key={a.name} value={a.name}>{a.name}</option>
						)}
					</select>
					<div>Born<input type='number' onChange={({ target }) => setBorn(target.value)}></input></div>
					<button type='submit'>Update author</button>
				</form>
			</>
		}
		</div>
	)
}

export default Authors