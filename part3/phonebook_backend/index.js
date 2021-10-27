require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('person', (req) => {
	return JSON.stringify(req.body)
})

const errorHandler = (err, req, res, next) => {
	console.log(err.message)
	if (err.name === 'CastError') {
		return res.status(400).send({ err: 'Malformatted id' })
	} else if (err.name === 'ValidationError') {
		return res.status(400).send({ err: err.message })
	}
	next(err)
}

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// Logs only POST requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person', {
	skip: (req) => { return req.method !== 'POST' }
}))

// Logs everything else expect POST request
app.use(morgan('tiny', {
	skip: (req) => { return req.method === 'POST' }
}))


app.get('/info', (req, res, next) => {
	Person.count({})
		.then(count => {
			res.send(`<p>Phonebook has info for ${count} people</p>
							<p>${new Date}</p>`)
		})
		.catch(error => next(error))
})


app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then(persons => {
			res.json(persons)
		})
		.catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person)
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
	const body = req.body

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save()
		.then(savedPerson => {
			res.json(savedPerson)
		})
		.catch(error => next(error))
})


app.put('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndUpdate(req.params.id, { number: req.body.number })
		.then(updatedPerson => {
			res.json(updatedPerson.toJSON())
		})
		.catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch(error => next(error))
})


const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler)