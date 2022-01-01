import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
	const books = useQuery(ALL_BOOKS)

	if (!show) {
		return null
	}

	return (
		<div> {books.loading
			? <p>Loading...</p>
			: <>
				<h2>books</h2>

				<table>
					<tbody>
						<tr>
							<th></th>
							<th>
								author
							</th>
							<th>
								published
							</th>
						</tr>
						{books.data.allBooks.map(a =>
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author}</td>
								<td>{a.published}</td>
							</tr>
						)}
					</tbody>
				</table>
			</>
		}
		</div>
	)
}

export default Books