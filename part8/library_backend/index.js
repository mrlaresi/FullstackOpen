require('dotenv').config()
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { ApolloServer, UserInputError, gql } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { PubSub } = require('graphql-subscriptions')
const express = require('express')
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const jwt = require('jsonwebtoken')

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET

const pubsub = new PubSub()

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log(error)
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

	type Subscription {
		bookAdded: Book!
	}
`

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			let filter = {}
			if (args.author) {
				const author = await Author.findOne({ name: args.author })
				filter.author = author._id
			}
			filter = args.genre ? { ...filter, genres: args.genre } : filter
			return await Book.find(filter).populate('author', { name: 1, born: 1, id: 1 })
		},
		allAuthors: async (root, args) => await Author.find({}),
		me: (root, args, context) => {
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
					author = await new Author({ name: args.author }).save()
				} catch (e) {
					throw new UserInputError(e.message, { invalidArgs: args })
				}
			}
			try {
				const book = await new Book({ ...args, author }).save()
				pubsub.publish('BOOK_ADDED', { bookAdded: book })
				return book
				
			} catch (e) {
				throw new UserInputError(e.message, { invalidArgs: args })
			}
		},
		editAuthor: async (root, args, context) => {
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
				}, JWT_SECRET)
			}
		}
	},
	Subscription: {
		bookAdded : {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		}
	}
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const startServer = async () => {
	const app = express()
	const httpServer = createServer(app)

	const subscriptionServer = SubscriptionServer.create(
		{ schema, execute, subscribe }, 
		{ server: httpServer, path: '/graphql' })

	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null
			if (auth && auth.toLowerCase().startsWith('bearer')) {
				const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
				return { currentUser: await User.findById(decodedToken.id) }
			}
		},
		plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground({}),
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close()
						}
					}
				}
			}
		]
	})

	await server.start()
	server.applyMiddleware({ app, path: '/' })

	await new Promise(resolve => httpServer.listen({ port: 4001 }, resolve))
	.then(() => {
		console.log(`Server ready at http://localhost:4001${server.graphqlPath}`)
	})
}

startServer()

