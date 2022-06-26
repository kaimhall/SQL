const router = require('express').Router()
const {SessionData} = require('../models')
const {User} = require('../models')

router.delete('/', async (req, res) => {
  const id = req.body.id
  const usr = await User.findOne({
    where: {
      id: id,
    },
  })

  if (usr) {
    SessionData.destroy({
      where: {
        user_id: usr.id,
      },
    })
    usr.disabled = true
    await usr.save()
    res.json(usr)
  } else {
    res.status(404).end()
  }
})

//route to disable user
router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  })

  if (user) {
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
