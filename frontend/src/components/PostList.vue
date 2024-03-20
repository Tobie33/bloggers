<template>
  <div id="post-list">
    <template v-for="post in posts" :key="post.id">
      <router-link :to="{name: 'Post', params: {postId: post.id}}">
        <PostBlock :post="post"/>
      </router-link>
    </template>
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
#post-list{
  display:flex;
  gap: 50px 10px;
  flex-wrap: wrap;
}

</style>
