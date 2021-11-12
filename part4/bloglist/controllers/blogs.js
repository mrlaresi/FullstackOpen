const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const blog = await Blog.find({})
	response.json(blog)
})

blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	const result = await blog.save()
	response.status(201).json(result)
})

blogRouter.put('/:id', async (request, response) => {
	const blog = {
		likes: request.body.likes
	}
	console.log(request.body)
	const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(result.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = blogRouter