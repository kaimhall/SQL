const express = require('express')
const log = require('./utils/logger')
const app = express()

const { PORT } = require('./utils/config')
const {DBConnect} = require('./utils/db')

const BlogRouter = require('./controllers/blogRouter')

app.use(express.json())

app.use('/api/blogs', BlogRouter)

const start = async () => {
  await DBConnect()
  app.listen(PORT, () => {
    log.info(`Server running on port ${PORT}`)
  })
}

start()
