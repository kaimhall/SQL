const {errorHandler, unknownEndpoint} = require('./utils/errorHandler')
const express = require('express')
require('express-async-errors')

const log = require('./utils/logger')
const app = express()

const {PORT} = require('./utils/config')
const {DBConnect} = require('./utils/db')

const BlogRouter = require('./controllers/blogRouter')
const UsersRouter = require('./controllers/userRouter')
const LoginRouter = require('./controllers/login')
const AuthorRouter = require('./controllers/authorRouter')

app.use(express.json())

app.use('/api/blogs', BlogRouter)
app.use('/api/users', UsersRouter)
app.use('/api/login', LoginRouter)
app.use('/api/authors', AuthorRouter)

app.use(unknownEndpoint)

app.use(errorHandler)

const start = async () => {
  await DBConnect()
  app.listen(PORT, () => {
    log.info(`Server running on port ${PORT}`)
  })
}

start()
