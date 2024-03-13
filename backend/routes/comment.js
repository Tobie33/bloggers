const express = require('express')
const router = express.Router()
const {Comment, Post} = require("../models")


//Get all posts
router.get('/:postId', async (req,res) => {
  const {postId} = req.params
  const allComments = await Comment.findAll({
    where:{
      PostId: postId
    }
  })
  return res.send(allComments)
})

//Get a single post
router.get('/:commentId', async (req, res) => {
  const {commentId} = req.params
  const singleComment = await Comment.findByPk(commentId)
  return res.send(singleComment)
})

//Create a new comment
router.post('/:postId', async (req,res) => {
  const {postId} = req.params
  const comment = req.body
  const createdPost = await Comment.create({
    ...comment,
    PostId: postId
  })
  return res.send(createdPost)
})

//Edit a single post
router.put('/:commentId', async (req, res) => {
  const {commentId} = req.params
  const comment = req.body
  const singleComment = await Comment.update(comment, {
    where:{
      id: commentId
    }
  })
  return res.send("Edited")
})

router.delete('/:commentId', async (req, res) => {
  const {commentId} = req.params
  await Post.destroy({
    where:{
      id: commentId
    }
  })

  return res.send("Deleted")
})



module.exports = router
