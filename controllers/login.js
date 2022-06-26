const jwt = require('jsonwebtoken')
const router = require('express').Router()
const {SessionData} = require('../models')
const {User} = require('../models')
const {SECRET} = require('../utils/config')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, SECRET)

  await SessionData.create({
    token: token,
    userId: user.id,
  })

  user.disabled = false
  user.save()

  response.status(200).send({...userForToken, token})
})

module.exports = router
