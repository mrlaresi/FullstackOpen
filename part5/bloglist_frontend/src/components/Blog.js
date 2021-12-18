import React,  { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	const pStyle = { margin: 0 }

	const [detailsVisible, setDetailsVisible] = useState(false)
	const visible = { display: detailsVisible ? '' : 'none' }
	const buttonText = detailsVisible ? 'Hide' : 'Show'

	const removeButton = blog.user.username === user.username
		? <button id='removeButton' onClick={() => {handleDelete(blog)}}>Remove blog</button>
		: <></>

	Blog.propTypes = {
		blog: PropTypes.object.isRequired,
		handleLike: PropTypes.func.isRequired,
		handleDelete: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired
	}

	const changeVisibility = () => {
		setDetailsVisible(!detailsVisible)
	}

	return (
		<div style={blogStyle} className='blog'>
			<p style={pStyle}>{blog.title} by {blog.author}
				<button onClick={changeVisibility} id='visibilityButton'>{buttonText}</button>
			</p>
			<div style={visible} className='hiddenContent'>
				<p style={pStyle}>{blog.url}</p>
				<p style={pStyle}>
					<span>Likes: </span>
					<span id='likes'>{blog.likes}</span>
					<button id='likeButton' onClick={() => handleLike(blog)}>Like</button>
				</p>
				<p style={pStyle}>{blog.user.name}</p>
				{removeButton}
			</div>
		</div>
	)
}

export default Blog