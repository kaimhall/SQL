const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {UserReading, User} = require('../models')

const {SECRET} = require('../utils/config')

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
  const entries = await UserReading.findAll({
    attributes: ['id', 'user_id', 'blog_id'],
  })
  res.json(entries)
})

router.post('/', async (req, res) => {
  const listEntry = await UserReading.create({...req.body})
  res.json(listEntry)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const usr = await User.findOne({
    where: {
      id: req.decodedToken.id,
    },
  })
  const entry = await UserReading.findByPk(req.params.id)

  if (entry.user_id === usr.id) {
    entry.read = req.body.read
    await entry.save()
    res.json(entry)
  }
})
module.exports = router
