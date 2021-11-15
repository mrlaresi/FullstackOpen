const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	for (let blog in helper.initialBlogs) {
		let blogObject = new Blog(helper.initialBlogs[blog])
		await blogObject.save()
	}
})

describe('getting blogs', () => {
	test('get method works', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all notes are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('id should be stored in id property', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body[0].id).toBeDefined()
	})
})

describe('modifying blogs', () => {
	let userToken = null
	beforeAll(async () => {
		await User.deleteMany({})
		const user = helper.initialUsers[0]
		const passwordHash = await bcrypt.hash(user.password, 10)
		let userObject = new User({
			username: user.username,
			name: user.name,
			passwordHash
		})
		await userObject.save()

		const response = await api
			.post('/api/login')
			.send({
				username: user.username,
				password: user.password
			})
		userToken = response.body.token
	})

	test('adding blogs works', async () => {
		const usersInDb = await helper.usersInDb()
		const addingUser = usersInDb[0]
		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				author: 'Teppo Tulppu',
				title: 'jones',
				url: 'eiankalle.fi',
				userId: addingUser.id
			})
			.expect(201)
			.expect('Content-Type', /application\/json/)
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
		const authors = blogsAtEnd.map(b => b.author)
		const titles = blogsAtEnd.map(b => b.title)
		expect(authors).toContain('Teppo Tulppu')
		expect(titles).toContain('jones')
	})

	test('likes default to 0 if not given', async () => {
		const usersInDb = await helper.usersInDb()
		const addingUser = usersInDb[0]
		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				author: 'Teppo Tulppu',
				title: 'jones',
				url: 'eiankalle.fi',
				userId: addingUser.id
			})
			.expect(201)
			.expect('Content-Type', /application\/json/)
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
		expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
	})

	test('bad request if required values not given', async () => {
		const usersInDb = await helper.usersInDb()
		const addingUser = usersInDb[0]
		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				likes: 2,
				userId: addingUser.id
			})
			.expect(400)
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})

	test('deleting works', async () => {
		const usersInDb = await helper.usersInDb()
		const addingUser = usersInDb[0]
		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				author: 'Teppo Tulppu',
				title: 'jones',
				url: 'eiankalle.fi',
				likes: 2,
				userId: addingUser.id
			})
			.expect(201)
		const blogsAtStart = await helper.blogsInDb()
		await api
			.delete(`/api/blogs/${blogsAtStart[blogsAtStart.length-1].id}`)
			.set('Authorization', `Bearer ${userToken}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
	})

	test('updating works', async () => {
		const blogsAtStart = await helper.blogsInDb()
		await api
			.put(`/api/blogs/${blogsAtStart[blogsAtStart.length-1].id}`)
			.set('Authorization', `Bearer ${userToken}`)
			.send({ likes: 20 })
			.expect(200)
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(20)
	})
})

afterAll(() => {
	mongoose.connection.close()
})