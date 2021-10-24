const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('person', (req) => {
	return JSON.stringify(req.body)
})

app.use(express.json())
app.use(cors())

// Logs only POST requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person', {
	skip: (req, res) => { return req.method !== "POST" }
}))

// Logs everything else expect POST request
app.use(morgan('tiny', {
	skip: (req, res) => { return req.method === "POST" }
}))


let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456"
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523"
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345"
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122"
	}
]


app.get('/info', (req, res) => {
		res.send(`<p>Phonebook has info for ${persons.length} people</p>
							<p>${new Date}</p>`)
	})


app.get('/api/persons', (req, res) => {
		res.json(persons)
	})


app.get('/api/persons/:id', (req, res) => {
		const id = Number(req.params.id)
		const person = persons.find(person => person.id === id)
		if (person) {
			res.json(person)
		} else {
			res.status(404).end()
		}
	})


const generateId = () => {
	return Math.floor(Math.random()*100000)
}


app.post('/api/persons', (req, res) => {
	const body = req.body
	console.log(req.method)

	if (!body.name) {
		return res.status(400).json({
			error: 'Name is missing'
		})
	}

	if (!body.number) {
		return res.status(400).json({
			error: 'Number is missing'
		})
	}

	const found = persons.find(person => person.name === body.name)
	if (found) {
		return res.status(400).json({
			error: 'Name must be unique'
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
	}

	persons = persons.concat(person)

	res.json(person)
})


app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)

	res.status(204).end()
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})