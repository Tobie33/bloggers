import axios from "axios"
import { ref } from 'vue'

//change format to then -> catch
const handlePostSubmit = async (title,content) => {
  try{
    const data = await axios.post('http://localhost:3001/posts',{
      title,
      content
    },
    {
      headers:{
        accessToken: localStorage.getItem('accessToken')
      }
    })

    return data

  }catch(err){
    console.log(err)
  }
}

const getPosts = () => {
  const posts = ref([])
  const error = ref('')

  axios.get('http://localhost:3001/posts')
  .then((res) => posts.value = res.data)
  .catch((err) => error.value = err.data)

  return {posts, error}
}

const getPost = (postId) => {
  const post = ref({})
  const error = ref('')

  axios.get(`http://localhost:3001/posts/${postId}`)
  .then((res) => post.value = res.data)
  .catch((err) => error.value = err.data)

  return {post, error}
}
export {handlePostSubmit, getPosts, getPost}
