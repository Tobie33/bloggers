const express = require('express')
const router = express.Router()
const {Comment, Post} = require("../models")
const {validation} = require('../middlewares/authentication')

//Get all Comments
router.get('/', async (req,res) => {
  const allComments = await Comment.findAll()
  return res.send(allComments)
})

//Get a single comment
router.get('/:commentId', async (req, res) => {
  const {commentId} = req.params
  const singleComment = await Comment.findByPk(commentId)
  return res.send(singleComment)
})

//Create a new comment
router.post('/', validation, async (req,res) => {
  const comment = req.body
  const createdPost = await Comment.create({
    ...comment,
    UserId: req.user.id
  })
  return res.send(createdPost)
})

//Edit a single comment
router.put('/:commentId', validation, async (req, res) => {
  const {commentId} = req.params
  const comment = req.body

  await Comment.update(comment, {
    where:{
      id: commentId
    },
  })

  const EditedComment = await Comment.findByPk(commentId)

  return res.send(EditedComment)
})

//Delete Comment

router.delete('/:commentId', validation, async (req, res) => {
  const {commentId} = req.params
  await Comment.destroy({
    where:{
      id: commentId
    }
  })

  return res.send(`Comment ${commentId} has been deleted`)
})



module.exports = router
