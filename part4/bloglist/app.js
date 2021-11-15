const express = require('express')
const cors = require('cors')
const app = express()
require('express-async-errors')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

/* Unique validator will throw an error when trying to update the contents of
* a user like when adding new blogs with version 3.0.2. A way to bypass the
* issue is to downgrade it to 2.0.3 and downgrading mongoose to 5.11.13 (as of
* writing this, those were the working versions 15.11.2021).
* More info on the issue:
* https://github.com/blakehaswell/mongoose-unique-validator/issues/131
*/
mongoose.connect(config.MONGODB_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connection to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)


module.exports = app