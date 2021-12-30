const commentRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentRouter.get('/:id/comments', async (request, response) => {
	const comment = await Comment
		.find({})
	response.json(comment)

})

commentRouter.post('/:id/comments', async (request, response) => {
	const body = request.body
	const user = request.user
	if (!user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const comment = new Comment({
		content: body.comment,
		blog: body.blog
	})
	const blog = await Blog.findById(body.blog)
	const savedComment = await comment.save(``)
	blog.comments.push(savedComment._id)
	await blog.save()
	response.status(201).json(savedComment)
})

module.exports = commentRouter