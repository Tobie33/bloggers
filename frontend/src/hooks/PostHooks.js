import axios from "axios"
import { ref } from 'vue'

const handlePostSubmit = (title,content) => {
  axios.post('http://localhost:3001/posts',{
    title,
    content
  })
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
}

const getPosts = () => {
  const posts = ref([])
  const error = ref('')

  axios.get('http://localhost:3001/posts')
  .then((res) => posts.value = res.data)
  .catch((err) => error.value = err.data)

  return {posts, error}
}

export {handlePostSubmit, getPosts}
