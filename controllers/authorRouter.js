const router = require('express').Router()
const { Blog, User } = require('../models')
const sequelize = require('../utils/db')


router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author', 'title', 'likes',
      [sequelize.fn('COUNT'), sequelize.col('title'), 'articles'],
      [sequelize.fn('SUM'), sequelize.col('likes'), 'likes'],
    ],
    include: {
      model: User,
      attributes: ['id']
    },
    group: ['author']
  })
  res.json(authors)
})

module.exports = router
