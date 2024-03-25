const express = require('express')
const router = express.Router()
const {User} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const {validation} = require('../middlewares/authentication')
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/'})
const {uploadFile, getFileStream} = require('../s3')
const user = require('../models/user')

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

router.put('/user', validation, async (req,res) => {
  const {username} = req.body

  const updatedUser = await User.update({username},{
    where:{
      id: req.user.id
    }
  })

  return res.json("Edited Name")

})

router.post('/image', upload.single('image'), async (req,res) => {
  const file = req.file
  const result = await uploadFile(file)
  console.log(result)
  return res.send({imagePath: `image/${result.Key}`})
})

router.get('/image/:key', (req,res) => {
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})
module.exports = router
