const express = require('express')
const router = express.Router()
const {User} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
// Add to any route with validation required once frontend is done
const {validation} = require('../middlewares/authentication')

router.post('/', async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    res.status(400)
    return res.json({error: "Fill in all the required fields"})
  }

  const duplicateCheck = await User.findOne({email})

  if (duplicateCheck) {
    res.status(400)
    return res.json({error: "Email already exists"})

  } else {
    bcrypt.hash(password, 10).then(hash => {
      User.create({
        email,
        password: hash
      })
      return res.send("Success")
    })
  }
})

//add Middleware once backend complete
router.post('/login', async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    res.status(400)
    return res.json({error: "Fill in all the required fields"})
  }

  const user = await User.findOne({
    where:{
      email
    }
  })

  if(!user){
    res.status(404)
    return res.json({error: "Email does not exist"})
  }

  bcrypt.compare(password, user.password).then(match => {
    if(!match){
      res.status(400)
      return res.json({error: "Password Incorrect"})
    }
    console.log(process.env.TOKEN_SECRET)
    const accessToken = sign({username: user.username, id:user.id}, process.env.TOKEN_SECRET)

    res.status(200)
    return res.json(accessToken)
  })
})

module.exports = router
