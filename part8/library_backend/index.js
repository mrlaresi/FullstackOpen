require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const jwt = require('jsonwebtoken')

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const { v1: uuid } = require('uuid')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const typeDefs = gql`
	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}

	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int!
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
		editAuthor(
			name: String!
			setBornTo: Int!
		): Author
		createUser(
			username: String!
			favoriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}
`

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			let filter = args.author ? { 'author.name': { $in:[args.author] } } : {}
			filter = args.genre ? { ...filter, genres: args.genre } : filter
			console.log(filter)
			const asd = await Book.find(filter).populate('author', { name: 1, born: 1, id: 1 })
			console.log(asd)
			return asd
			
		},
		allAuthors: async (root, args) => await Author.find({}),
		me: (root, args, context) => {
			console.log(context)
			return context.currentUser
		}
	},
	Author: {
		bookCount: (root) => 
			Book.collection.countDocuments({ author: new ObjectId(root.id) })
	},
	Mutation: {
		addBook: async (root, args, context) => {
			if (!context.currentUser) {
				throw new UserInputError("User not logged in")
			}
			let author = await Author.findOne({ name: args.author })
			if (!author) {
				try {
					author = await new Author({name: args.author}).save()
				} catch (e) {
					throw new UserInputError(e.message, { invalidArgs: args })
				}
			}
			try { 
				const book = await new Book({ ...args, author }).save()
				return book
			} catch (e) {
				throw new UserInputError(e.message, { invalidArgs: args })
			}
		},
		editAuthor: async (root, args, context) => {
			console.log(context)
			if (!context.currentUser) {
				throw new UserInputError("User not logged in")
			}
			let author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
			author.born = args.setBornTo
			return author
		},
		createUser: async (root, args) => {
			try {
				const user = new User({ args })
				return await user.save()
			} catch (e) {
				throw new UserInputError(e.message, { invalidArgs: args })
			}
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })
			if (!user || args.password !== 'secret') {
				throw new UserInputError('Wrong credentials')
			}

			return { 
				value: jwt.sign({
					username: user.username,
					id: user._id
			}, JWT_SECRET) }
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.toLowerCase().startsWith('bearer')) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
			return { currentUser: await User.findById(decodedToken.id) }
		}
	},
	plugins: [
		ApolloServerPluginLandingPageGraphQLPlayground({

		})
	]
})

server.listen({ port: 4001 }).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
