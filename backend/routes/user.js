const express = require('express')
const router = express.Router()
const {User} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
// Add to any route with validation required once frontend is done
const {validation} = require('../middlewares/authentication')

router.post('/', async (req, res) => {
  const {email, password} = req.body
  console.log(email)

  if (!email || !password) {
    res.status(400)
    return res.send("Fill in all the required fields")
  }

  const duplicateCheck = await User.findOne({where:{
    email
  }})

  if (duplicateCheck) {
    res.status(400)
    return res.send("Email already exists")
  } else {
    bcrypt.hash(password, 10).then(hash => {
      User.create({
        email,
        password: hash
      })
      .then(user => {
        const accessToken = sign({username: user.username, id:user.id}, process.env.TOKEN_SECRET)
        return res.send({accessToken, id: user.id})
      })
    })
  }
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    res.status(400)
    return res.send("Fill in all the required fields")
  }

  const user = await User.findOne({
    where:{
      email
    }
  })

  if(!user){
    res.status(404)
    return res.send("Email does not exist")
  }

  bcrypt.compare(password, user.password).then(match => {
    if(!match){
      res.status(400)
      return res.send("Password Incorrect")
    }
    const accessToken = sign({username: user.username, id:user.id}, process.env.TOKEN_SECRET)

    res.status(200)
    return res.json({accessToken, id: user.id})
  })
})

router.get('/user', validation, async (req,res) => {
  return res.send(req.user)
})

module.exports = router
