import React, { useRef }from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BlogP } from '../styles'

import BlogForm from './BlogForm'
import Togglable from './Toggleable'

const BlogsList = (props) => {
	const blogs = useSelector(state => state.blogs)
	const blogFormRef = useRef()

	const hideCreate = () => {
		blogFormRef.current.toggleVisibility()
	}

	return (
		<>
			<Togglable buttonLabel="Create new blog" ref={blogFormRef}>
				<BlogForm handleCreate={props.handleCreate} hideCreate={hideCreate} />
			</Togglable>
			{blogs.map(blog =>
				<BlogP key={blog.id}>
					<Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
				</BlogP>
			)}
		</>
	)
}

export default BlogsList