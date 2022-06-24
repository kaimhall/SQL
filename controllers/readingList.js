const router = require('express').Router()
const {UserReading} = require('../models')

router.post('/', async (req, res) => {
  //todo - add userid and blogid into rlist
  const listEntry = await UserReading.create({...req.body})
  res.json(listEntry)
})

module.exports = router
