const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})