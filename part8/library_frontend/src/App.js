import { useApolloClient, useMutation, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, LOGIN } from './queries'



const App = () => {
	const [token, setToken] = useState(null)
	const [page, setPage] = useState('authors')
	const [login, result] = useMutation(LOGIN)

	const client = useApolloClient()

	const updateCacheWith = (addedBook) => {
		const includedIn = (set, object) =>
			set.map(p => p.id).includes(object.id)

		const booksInStore = client.readQuery({ query: ALL_BOOKS })
		const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
		// Books may be null if book tab is not opened beforehand
		if (booksInStore && !includedIn(booksInStore.allBooks, addedBook)) {
			client.writeQuery({
				query: ALL_BOOKS,
				data: { allBooks: booksInStore.allBooks.concat(addedBook) }
			})
		}

		let modifiedAuthors
		if (!includedIn(authorsInStore.allAuthors, addedBook.author)) {
			modifiedAuthors = authorsInStore.allAuthors.concat(addedBook.author)
		} else {
			modifiedAuthors = authorsInStore.allAuthors.reduce((returned, author) => {
				if (author.id === addedBook.author.id) {
					returned.push({ ...author, bookCount: author.bookCount })
				} else {
					returned.push(author)
				}
				return returned
			}, [])
		}
		client.writeQuery({
			query: ALL_AUTHORS, data: { allAuthors: modifiedAuthors }
		})
	}
	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
			window.alert(`New book has been added to the library: ${addedBook.title}`)
			updateCacheWith(addedBook)
		}
	})


	useEffect(() => {
		const token = localStorage.getItem('libraryAppUser')
		if (token) {
			setToken(token)
		}
	}, [])

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('libraryAppUser', token)
			setPage('authors')
		}
	}, [result.data])

	const handleLogout = () => {
		setToken(null)
		localStorage.removeItem('libraryAppUser')
		client.resetStore()
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>Authors</button>
				<button onClick={() => setPage('books')}>Books</button>
				{token
					? <>
						<button onClick={() => setPage('add')}>Add book</button>
						<button onClick={() => setPage('recommend')}>Recommend</button>
						<button onClick={handleLogout}>Logout</button>
					</>
					: <button onClick={() => setPage('login')}>Login</button>
				}
			</div>

			<Authors
				show={page === 'authors'}
			/>

			<Books
				show={page === 'books'}
			/>

			<NewBook
				show={page === 'add'}
				updateCacheWith={updateCacheWith}
			/>

			<Recommendations
				show={page === 'recommend'}
			/>

			<Login
				show={page === 'login'}
				login={login}
			/>
		</div>
	)
}

export default App