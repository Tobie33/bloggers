const express = require('express')
const router = express.Router()
const {Post, Comment, Like} = require("../models")
const {validation} = require('../middlewares/authentication')


//Get all posts
router.get('/', async (req,res) => {
  const allPosts = await Post.findAll({
    include:
      [Comment, Like]
  })
  return res.send(allPosts)
})

//Get a single post
router.get('/:postId', async (req, res) => {
  const {postId} = req.params
  const singlePost = await Post.findByPk(postId, {
    include: [Comment, Like]
  })
  return res.send(singlePost)
})

//Create a new post
router.post('/', validation, async (req,res) => {
  const post = req.body
  console.log(req.user)
  const createdPost = await Post.create(post)
  return res.send(createdPost)
})

//Edit a single post
router.put('/:postId', validation, async (req, res) => {
  const {postId} = req.params
  const post = req.body
  const singlePost = await Post.update(post, {
    where:{
      id: postId
    }
  })
  return res.send("Edited")
})

router.delete('/:postId', validation, async (req, res) => {
  const {postId} = req.params
  await Post.destroy({
    where:{
      id: postId
    }
  })

  return res.send("Deleted")
})


module.exports = router
