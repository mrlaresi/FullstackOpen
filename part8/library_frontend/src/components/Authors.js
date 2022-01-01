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

	return (
		<div>{authors.loading
			? <p>Loading...</p>
			: <>
				<h2>authors</h2>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>
								born
							</th>
							<th>
								books
							</th>
						</tr>
						{authors.data.allAuthors.map(a =>
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
					<select value={name} onChange={({ target }) => setName(target.value)}>{authors.data.allAuthors.map(a =>
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