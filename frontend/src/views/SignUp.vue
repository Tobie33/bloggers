<template>
  <h3>Sign Up</h3>
  <form @submit.prevent="signUp">
    <label>Email</label>
    <input type="text" required v-model="email">
    <label>Password</label>
    <input type="password" required v-model="password">
    <button type="submit">Submit</button>
    <h6 v-if="signUpError">{{ signUpError }}</h6>
  </form>
</template>

<script>
import { ref } from 'vue'
import { handleSignUp } from '@/hooks/UserHooks'
import { useRouter } from 'vue-router'
export default {
  name:'SignUp',
  setup(){
    const email = ref('')
    const password = ref('')
    const signUpError = ref('')
    const router = useRouter()

    const signUp = async () => {
      const {userInfo, error} = await handleSignUp(email.value,password.value)
      signUpError.value = error.value
      if(Object.keys(userInfo.value).length !== 0){
        localStorage.setItem("accessToken", userInfo.value.accessToken)
        router.push('/')
      }
    }

    return {email, password, signUpError, signUp}
  }
}
</script>

<style>

</style>
