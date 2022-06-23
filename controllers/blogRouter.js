const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {Blog, User} = require('../models')
const {Op} = require('sequelize')
//const sequelize = require('../utils/db')

const {SECRET} = require('../utils/config')

const blogFinder = async (req) => {
  req.blog = await Blog.findByPk(req.params.id)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      res.status(401).json({error: 'token invalid'})
    }
  } else {
    res.status(401).json({error: 'token missing'})
  }
  next()
}

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ],
    }
  }

  const blogs = await Blog.findAll({
    attributes: {exclude: ['userId']},
    include: {
      model: User,
      attributes: ['username'],
    },
    where,
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({...req.body, userId: user.id})
  res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.note) {
    res.json(req.note)
  } else {
    res.status(404).send({error: 'blog not found'})
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.findByPk(req.params.id)
  if (blog.userId === user.id) {
    blog.destroy({
      where: {
        id: blog.id,
      },
    })
    // eslint-disable-next-line quotes
    res.send(`deleted blog id: ${req.params.id}`)
  }
})

// eslint-disable-next-line no-unused-vars
router.delete('/', async (req, res) => {
  await Blog.destroy({
    truncate: true,
  })
  res.json('table wiped')
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).send({error: 'blog not found'})
  }
})

module.exports = router
