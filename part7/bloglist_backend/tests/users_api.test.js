const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})
	for (let user in helper.initialUsers) {
		let temp = helper.initialUsers[user]
		let userObject = new User({
			username: temp.username,
			name: temp.name,
			passwordHash: await bcrypt.hash(temp.password, 10)
		})
		await userObject.save()
	}
})

//describe('getting users')
describe('modifying users', () => {
	test('adding users works', async () => {
		await api
			.post('/api/users')
			.send({
				username: 'akua',
				name: 'Aku Ankka',
				password: 'salattu'
			})
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const usersAtEnd = await helper.usersInDb()
		const users = usersAtEnd.map(b => b.username)
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length+1)
		expect(users).toContain('akua')
	})

	test('user without username cannot be added', async () => {
		await api
			.post('/api/users')
			.send({
				name: 'Kulta-Into Pii',
				password: 'australia'
			})
			.expect(400)
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
	})

	test('user with invalid password cannot be added', async () => {
		await api
			.post('/api/users')
			.send({
				username: 'onnenlantti',
				name: 'Roope Ankka',
				password: 'ab'
			})
			.expect(400)
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})