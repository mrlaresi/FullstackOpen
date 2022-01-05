import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

const BookTable = ({ genre, setGenreArray, genresSet }) => {
	// Book query will always run when genre changes
	let options = { fetchPolicy: 'network-only' }
	if (genre !== '') {
		options = { ...options, variables: { genre } }
	}
	const books = useQuery(ALL_BOOKS, options)

	useEffect(() => {
		if (genre === '' && !books.loading && !genresSet) {
			console.log(books)
			const genres = books.data.allBooks.flatMap((b) => b.genres)
			setGenreArray([...new Set(genres)])
		}
	}, [books])

	const sortBooks = (books) => {
		return [...books].sort((a, b) => {
			if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
			if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
			return 0
		})
	}


	return (
		<> {books.loading
			? <p>Loading...</p>
			: <table>
				<tbody>
					<tr>
						<th></th>
						<th>
							Author
						</th>
						<th>
							Published
						</th>
					</tr>
					{sortBooks(books.data.allBooks).map(a =>
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					)}
				</tbody>
			</table>
		}
		</>
	)
}

export default BookTable