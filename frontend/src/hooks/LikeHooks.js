import axios from "axios"
import { ref } from 'vue'


const handleLikeCount = async (PostId) => {
  const likeCheck = ref(false)
  await axios.post('http://localhost:3001/likes',{
    PostId
  },{
    headers:{
      accessToken: localStorage.getItem('accessToken')
    }
  })
  .then(res => likeCheck.value = res.data.liked)
  .catch(err => console.error(err))

  return {likeCheck}
}

export {handleLikeCount}
