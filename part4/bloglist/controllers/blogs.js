const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const blog = await Blog
		.find({})
		.populate('user', { username: 1, name: 1, id: 1 })
	response.json(blog)
})

blogRouter.post('/', async (request, response) => {
	const body = request.body
	const user = request.user
	if (!user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog
		.findById(request.params.id)
		.populate('user', { username: 1, name: 1, id: 1 })
	response.json(blog)
})

blogRouter.put('/:id', async (request, response) => {
	const blog = {
		likes: request.body.likes
	}
	const user = request.user
	if (!user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(result.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
	const user = request.user
	if (!user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const blog = await Blog.findById(request.params.id)
	if (blog.user) {
		if (blog.user.toString() === user.id.toString()) {
			blog.remove()
			response.status(204).end()
			return
		}
	}
	response.status(401).json({ error: 'you aren\'t authorized to delete this blog' })
})

module.exports = blogRouter