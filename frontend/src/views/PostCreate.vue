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
export default {
  setup(){
    const title = ref('')
    const content = ref('')

    const handleSubmit = () => {
      handlePostSubmit(title.value, content.value)
    }

    return {title, content, handleSubmit}
  }

}
</script>

<style>

</style>
