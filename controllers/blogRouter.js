const router = require('express').Router()
const { Blog, User } = require('../models')

const blogFinder = async (req) => {
  req.blog = await Blog.findByPk(req.params.id)
}


router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
}
)

router.post('/', async (req, res) => {
  const user = await User.findOne()
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
}
)

router.get('/:id', blogFinder, async (req, res) => {
  if (req.note) {
    res.json(req.note)
  } else {
    res.status(404).send({ error: 'blog not found' })
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy()
  }
  res.status(204).send({ error: 'blog not found' })
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).send({ error: 'blog not found' })
  }
})

module.exports = router