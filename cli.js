const { errorHandler, unknownEndpoint } = require('./utils/errorHandler')
const express = require('express')
require('express-async-errors')

const log = require('./utils/logger')
const app = express()

const { PORT } = require('./utils/config')
const { DBConnect } = require('./utils/db')

const BlogRouter = require('./controllers/blogRouter')
const usersRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use('/api/blogs', BlogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)

app.use(errorHandler)

const start = async () => {
  await DBConnect()
  app.listen(PORT, () => {
    log.info(`Server running on port ${PORT}`)
  })
}

start()
