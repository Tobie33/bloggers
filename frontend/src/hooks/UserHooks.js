import axios from "axios"
import { ref } from 'vue'

const handleSignUp = async (email, password) => {
  const userInfo = ref({})
  const error = ref('')

  await axios.post('http://localhost:3001/auth', {
    email,
    password
  })
  .then(res => userInfo.value = res.data)
  .catch(err => error.value = err.response.data)

  return {userInfo, error}
}

const handleLogin = async (email, password) => {
  const userInfo = ref({})
  const error = ref('')

  await axios.post('http://localhost:3001/auth/login', {
    email,
    password
  })
  .then(res => userInfo.value = res.data)
  .catch(err => error.value = err.response.data)

  return {userInfo, error}
}

const fetchUserInfo = () => {
  const user = ref({})
  const error = ref({})

  axios.get('http://localhost:3001/auth/user', {
    headers: {
      'accessToken': localStorage.getItem('accessToken')
    }
  })
  .then(res => user.value = res.data)
  .catch(err => error.value = err.response.data)

  return {user, error}
}

export {handleSignUp, handleLogin, fetchUserInfo}
