<template>
  <h1>Posts Page</h1>
  <PostList :posts="posts"/>
</template>

<script>

import {getPosts} from '@/hooks/PostHooks'
import PostList from '@/components/PostList.vue'


export default {
  name: 'Posts',
  components: {PostList},
  setup(){

    const {posts, error} = getPosts()

    return {posts, error}
  }

}
</script>

<style>

</style>
