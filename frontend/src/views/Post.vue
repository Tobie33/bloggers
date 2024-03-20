<template>
  <div id="blog-page">
    <h3>Post {{ postId }}</h3>
    <PostBlock :post="post"/>
  </div>
</template>

<script>
import { getPost } from '@/hooks/PostHooks';
import PostBlock from '@/components/PostBlock.vue';

export default {
  name: 'Post',
  props:['postId'],
  components: {PostBlock},
  setup(props){
    const {post, error} = getPost(props.postId)

    return {post, error}
  }

}
</script>

<style>
#blog-page{
  display:flex;
  flex-direction: column;
  align-items: center;
}
</style>
