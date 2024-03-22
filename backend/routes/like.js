const express = require('express')
const router = express.Router()
const {Like} = require("../models")
const {validation} = require('../middlewares/authentication')


//Liking a comment
router.post('/', validation, async (req,res) => {
  const {PostId} = req.body
  const {id: UserId} = req.user
  const likeCheck = await Like.findOne({
    where:{
      PostId, UserId
    }
  })

  if(!likeCheck){
    await Like.create({PostId, UserId})
    return res.json({message: "Post Liked", liked: true})
  } else {
    await Like.destroy({where: {PostId, UserId}})
    return res.json({message: "Post Unliked", liked: false})
  }
})

module.exports = router
