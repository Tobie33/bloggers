import { ref } from "vue"
import axios from "axios"

const handleCommentSubmit = async (title, content, PostId) => {
  const newPost = ref({})
  const error = ref('')

  await axios.post(`http://localhost:3001/comments`, {
    title,
    content,
    PostId
  },
  {
    headers:{
      accessToken: localStorage.getItem('accessToken')
    }
  })
  .then(res =>  newPost.value = res.data)
  .catch(err => error.value = err.Response.data)

  return {newPost, error}
}

const handleCommentDelete = async (commentId) => {
  await axios.delete(`http://localhost:3001/comments/${commentId}`,{
    headers:{
      accessToken: localStorage.getItem('accessToken')
    }
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

}

export {handleCommentSubmit, handleCommentDelete}
