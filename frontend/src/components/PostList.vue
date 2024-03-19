<template>
  <div v-for="post in posts" :key="post.id">
    <PostBlock :post="post"/>
  </div>
</template>

<script>
import PostBlock from '../components/PostBlock.vue'

export default {
  name: 'PostList',
  components:{PostBlock},
  props:['posts'],
  setup(props){

  }
}
</script>

<style>

</style>
