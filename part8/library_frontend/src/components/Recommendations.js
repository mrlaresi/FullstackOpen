import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_USER } from '../queries'
import BookTable from './BookTable'

const Recommendations = ({ show }) => {
	const user = useQuery(GET_USER)
	let genre = ''
	if (user.data) {
		genre = user.data.me.favoriteGenre
	}

	if (!show) {
		return null
	}

	return (
		<> {user.loading
			? <p>Loading...</p>
			: <>
				<h2>Recommendations</h2>
				<p>Books in our favorite genre <b>{genre}</b>:</p>
				<BookTable genre={genre} />
			</>
		}
		</>
	)
}

export default Recommendations