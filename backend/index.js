const express = require('express')
const cors = require('cors')
const app = express();
const db = require("./models")

//Express function to parse JSON files
app.use(express.json())

app.use(cors())

//dotenv imports environment variables from .env
require('dotenv').config()


// router format
const postRouter = require('./routes/post')
app.use('/posts', postRouter)
const commentRouter = require('./routes/comment')
app.use('/comments', commentRouter)
const userRouter = require('./routes/user')
app.use('/auth', userRouter)
const likeRouter = require('./routes/like')
app.use('/likes', likeRouter)



db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Testing")
  })
})
