<template>
  <h3>User</h3>
  <h4>{{ user.id }}</h4>
</template>

<script>
import { fetchUserInfo } from '@/hooks/UserHooks';

export default {
  name:'User',
  setup(){
    const {user,error} = fetchUserInfo()

    return {user, error}
  }
}
</script>

<style>

</style>
