const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.cy8vx.mongodb.net/phonebook-app?retryWrites=true&w=majority`


const fetchDatabase = () => {
	mongoose.connect(url)

	const personSchema = new mongoose.Schema({
		name: String,
		number: String,
	})

	const Person = mongoose.model('Person', personSchema)

	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person)
		})
		mongoose.connection.close()
	})
}


const addPerson = (inName, inNumber) => {
	const person = new Person({
		name: `${inName}`,
		number: `${inNumber}`,
	})

	person.save().then(() => {
		console.log('Person added to the phonebook!')
		mongoose.connection.close()
	})
}


const length = process.argv.length
if (length < 3) {
	console.log('No password was given.')
	process.exit(1)
}

mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (length === 3) {
	fetchDatabase()
} else if (length === 5) {
	addPerson(process.argv[3], process.argv[4])
} else {
	console.log('Invalid arguments were given.')
	process.exit(1)
}
