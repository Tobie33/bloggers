const express = require('express')
const router = express.Router()
const {Like} = require("../models")
const {validation} = require('../middlewares/authentication')


//Create a new comment
router.post('/', validation, async (req,res) => {
  const {PostId, UserId} = req.body
  const likeCheck = await Like.findOne({
    where:{
      PostId, UserId
    }
  })

  if(!likeCheck){
    await Like.create({PostId, UserId})
    return res.json("Post Liked")
  } else {
    await Like.destroy({where: {PostId, UserId}})
    return res.json("Post Unliked")
  }
})

module.exports = router
