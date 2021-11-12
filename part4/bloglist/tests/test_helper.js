const Blog = require('../models/blog')

const initialBlogs = [
	{
		author: 'Aku Ankka',
		likes: 2,
		title: 'donald',
		url: 'ankkalinna.fi',
	},
	{
		author: 'Hessu Hopo',
		likes: 3,
		title: 'goofy',
		url: 'hoponpoppoo.com'
	}
]

const nonExistingId = async () => {
	const blog = new Blog({
		author: 'temporary', title: 'non-existing', url: 'null'
	})
	await blog.save()
	await blog.remove()
	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}
module.exports = {
	initialBlogs, nonExistingId, blogsInDb
}