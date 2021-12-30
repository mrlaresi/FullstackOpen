import blogService from '../services/blogs'

import { showNotification } from './notificationReducer'

const sortBlogs = (blogs) => {
	return blogs.sort((first, second) => {
		return second.likes - first.likes
	})
}

const blogReducer = (state = [], action) => {
	switch (action.type) {
	case 'CREATE_BLOG': {
		return sortBlogs(state.concat(action.data))
	}
	case 'LIKE_BLOG':
		console.log(state)
		console.log(action)
		return sortBlogs(state.map(blog => {
			return blog.id === action.data.id
				? { ...action.data, user: blog.user, comments: blog.comments }
				: blog
		}))
	case 'REMOVE_BLOG': {
		return state.filter(blog => blog.id !== action.data.id)
	}
	case 'POST_COMMENT': {
		const data = action.data
		return state.reduce((previous, current) => {
			current.id === data.blog.id
				? previous.push({
					...data.blog,
					comments: data.blog.comments.concat(data.comment)
				})
				: previous.push(current)
			return previous
		}, [])
	}
	case 'INIT_BLOGS':
		return action.data
	default:
		return state
	}
}

export const createBlog = (content, user) => {
	return async dispatch => {
		try {
			const response = await blogService.create(content)

			const id = response.user

			dispatch({
				type: 'CREATE_BLOG',
				data: {
					...response,
					user: {
						id,
						username: user.username,
						name: user.name
					}
				}
			})
		} catch (e) {
			dispatch(showNotification('An error occurred while creating a blog', true, 5))
		}
	}
}

export const likeBlog = (blog) => {
	return async dispatch => {
		const updated = { ...blog, likes: blog.likes += 1, user: blog.user.id }
		const response = await blogService.update(updated)
		dispatch({
			type: 'LIKE_BLOG',
			data: response
		})
	}
}

export const removeBlog = (blog) => {
	return async dispatch => {
		await blogService.remove(blog)
		dispatch({
			type: 'REMOVE_BLOG',
			data: blog
		})
	}
}

export const newComment = (blog, comment) => {
	return async dispatch => {
		const response = await blogService.postComment(blog.id, comment)
		dispatch({
			type: 'POST_COMMENT',
			data: {
				comment: response,
				blog: blog
			}
		})
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		let blogs = await blogService.getAll()
		blogs = sortBlogs(blogs)
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs
		})
	}
}

export default blogReducer