const router = require('express').Router()

const User = require('../models/user')
const Blog = require('../models/blogs')

/*
const userFinder = async (req) => {
  req.user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
}
*/

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {exclude: ['userId']},
    },
  })

  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const usr = await User.findOne({
    where: {
      username: req.params.username,
    },
  })
  //console.log(JSON.stringify(usr, null, 2))
  usr.username = req.body.username
  await usr.save()
  res.json(usr)
})

router.delete('/:id', async (req, res) => {
  const usr = await User.findByPk(req.params.id)
  if (usr) {
    await usr.destroy()
    res.json(usr, 'deleted!')
  } else {
    res.status(204).send({error: 'blog not found'})
  }
})

router.delete('/', async (req, res) => {
  await User.destroy({
    truncate: true,
  })
  res.json('table wiped')
})

module.exports = router
