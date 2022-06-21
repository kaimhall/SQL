const router = require('express').Router()

const User = require('../models/user')

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
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const usr = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  if (usr) {
    //console.log(JSON.stringify(usr, null, 2))
    usr.username = req.body.username
    await usr.save()
    res.json(usr)
  }
  else {
    res.status(404).send({ error: 'blog not found' })
  }
})

module.exports = router