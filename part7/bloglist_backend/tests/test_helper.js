const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
	{
		username: 'ppeloton',
		name: 'Pelle Peloton',
		password: 'salaisuus'
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

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
	initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}