import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { likeBlog, removeBlog, newComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Button, H4, Span, Input, P, Li } from '../styles'

const Blog = ({ blogMatch }) => {
	const [comment, setComment] = useState('')
	const [redirect, setRedirect] = useState(false)

	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const blogDetails = useSelector(state => state.blogs)
		.reduce((previous, current) => {
			if (current.id === blogMatch.params.id) {
				return current
			}
			return previous
		}, null)



	const handleLike = () => {
		dispatch(likeBlog(blogDetails))
	}

	const handleDelete = async blog => {
		if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
			dispatch(removeBlog(blog))
			dispatch(showNotification('Blog succesfully deleted', false, 5))
		}
	}

	const commentChange = (e) => {
		setComment(e.target.value)
	}
	const handleComment = async () => {
		dispatch(newComment(blogDetails, comment))
		setComment('')
	}


	return (
		<>
			{blogDetails
				? <div className='blog'>
					<H4>{blogDetails.title} by {blogDetails.author}</H4>
					<P><a href={blogDetails.url}>{blogDetails.url}</a></P>
					<Span>Likes: </Span>
					<Span id='likes'>{blogDetails.likes} </Span>
					<Button id='likeButton' onClick={handleLike}>Like</Button>
					<P>Added by: {blogDetails.user.name}</P>
					{blogDetails.user.username === user.username
						? <Button id='removeButton' onClick={() => { handleDelete(blogDetails) }}>Remove blog</Button>
						: <></>
					}
					<H4>Comments about the blog:</H4>
					<Input value={comment} onChange={commentChange}></Input>
					<Button onClick={handleComment}>Add comment</Button>
					<ul>
						{blogDetails.comments.map((comment) => {
							return <Li key={comment.id}>{comment.content}</Li>
						})}
					</ul>
				</div>
				: <>
					<P>{`Blog doesn't exist anymore. Go back to front page?`}</P>
					<Button onClick={() => setRedirect(true)}>Yes</Button>
					{redirect ? <Redirect to='/' /> : <></>}
				</>
			}
		</>
	)
}

/*return (
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
	)*/


export default Blog