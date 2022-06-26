const Sequelize = require('sequelize') // have to use module, not intance of it
const router = require('express').Router()
const {Blog} = require('../models')

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [Sequelize.fn('count', Sequelize.col('Blog.title')), 'blogs'],
      [Sequelize.fn('sum', Sequelize.col('Blog.likes')), 'likes'],
    ],
    group: ['Blog.author'],
    raw: true,
    order: Sequelize.literal('likes DESC'),
  })
  res.json(authors)
})

module.exports = router
