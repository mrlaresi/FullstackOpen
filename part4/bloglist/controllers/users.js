const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const PasswordError = require('../utils/password_error')

userRouter.get('/', async (request, response) => {
	const user = await User
		.find({})
		.populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
	response.json(user.map(u => u.toJSON()))
})

userRouter.post('/', async (request, response, next) => {
	const body = request.body
	try {
		if (!body.password || body.password.length < 3) {
			// Custom written error as normal errors didn't work here
			throw new PasswordError('Password must be atleast three characters long')
		}
	} catch (error) {
		next(error)
		return
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash
	})

	const savedUser = await user.save()
	response.json(savedUser)
})

userRouter.get('/:id', async (request, response) => {
	const user = await User
		.findById(request.params.id)
		.populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
	response.json(user)
})

module.exports = userRouter