<template>
  <h3>Login</h3>
  <form @submit.prevent="login">
    <label>Email</label>
    <input type="text" required v-model="email">
    <label>Password</label>
    <input type="password" required v-model="password">
    <button type="submit">Submit</button>
    <h6 v-if="loginError">{{ loginError }}</h6>
  </form>
</template>

<script>
import { ref, toRaw } from 'vue'
import { handleLogin } from '@/hooks/UserHooks'
import { useRouter } from 'vue-router'
export default {
  name:'Login',
  setup(){
    const email = ref('')
    const password = ref('')
    const loginError = ref('')
    const router = useRouter()

    const login = async () => {
      const {userInfo, error} = await handleLogin(email.value,password.value)
      loginError.value = error.value
      if(Object.keys(userInfo.value).length !== 0){
        localStorage.setItem("accessToken", userInfo.value.accessToken)
        // reload would trigger before the push method so await is needed
        await router.push('/')
        router.go(0)
      }

    }

    return {email, password, loginError, login}

  }
}
</script>

<style>

</style>
