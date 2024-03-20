<template>
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" required v-model="title">
    <label>content</label>
    <input type="text" required v-model="content">
    <button type="submit">Submit</button>
  </form>



</template>

<script>
import { ref } from 'vue';
import {handlePostSubmit} from '@/hooks/PostHooks'
import { useRouter } from 'vue-router';
export default {
  setup(){
    const title = ref('')
    const content = ref('')
    const router = useRouter()

    const handleSubmit =  async () => {
      const data = await handlePostSubmit(title.value, content.value)
      if(data.status === 200) router.push('/posts')
    }

    return {title, content, handleSubmit}
  }

}
</script>

<style>

</style>
