const usersRouter = require('express').Router()
const User = require('../models/user')

const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs')

    response.json(users)
  } catch (e) {
    next(e)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (typeof body.password === 'undefined' || typeof body.username === 'undefined'){
      return response.status(400).json({ error: 'body requires both a username and a password'})
    }
    if (body.password.length <= 3 || body.username.length <= 3){
      return response.status(400).json({ error: 'username and password must be at least 3 characters long'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      blogs: body.blogs,
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }catch (e) {
    next(e)
  }
})

module.exports = usersRouter