import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { P, Button, Input, Form, H4 } from '../styles'

const BlogForm = ({ hideCreate }) => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = event => {
		event.preventDefault()
		if (title !== '' && author !== '' && url !== '') {
			dispatch(createBlog({
				title: title,
				author: author,
				url: url
			}, user))
			dispatch(showNotification(
				`A new blog '${title}' by ${author} added`,
				false,
				5
			))
			hideCreate()
		} else {
			dispatch(showNotification(
				'Please fill all the fields',
				true,
				5
			))
			return
		}
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<>
			<H4>Create new blog</H4>
			<Form onSubmit={addBlog}>
				<P>Title: <Input id='inputTitle' value={title} type="text"
					onChange={({ target }) => setTitle(target.value)} />
				</P>
				<P>Author: <Input id='inputAuthor' value={author} type="text"
					onChange={({ target }) => setAuthor(target.value)} />
				</P>
				<P>Url: <Input id='inputUrl' value={url} type="text"
					onChange={({ target }) => setUrl(target.value)} />
				</P>
				<Button id='buttonSubmit' type="submit">Create</Button>
			</Form>
		</>
	)
}

export default BlogForm