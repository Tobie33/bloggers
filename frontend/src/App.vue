<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <template v-if="Object.keys(user).length === 0">
      <router-link :to="{ name: 'Login'}">Login</router-link> |
      <router-link :to="{ name: 'SignUp'}">Sign Up</router-link> |
    </template>
    <template v-else>
      <router-link :to="{ name: 'User'}">User</router-link> |
      <router-link :to="{ name: 'PostCreate'}">Create</router-link> |
      <button @click="logout">Logout</button>
    </template>
    <router-link :to="{ name: 'Posts'}">Pages</router-link>
  </nav>
  <router-view />
</template>
<script>
import {fetchUserInfo} from  '@/hooks/UserHooks'
import { useRouter } from 'vue-router'
export default {
  setup(){

    const router = useRouter()

    const {user, error} = fetchUserInfo()

    const logout = () => {
      localStorage.removeItem('accessToken')
      router.go(0)
    }

    return {user, error, logout}
  }
}

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

a{
  text-decoration: none;
  color: #000000
}
</style>
