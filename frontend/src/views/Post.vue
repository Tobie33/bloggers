<template>
  <div id="blog-page">
    <h3>Post {{ postId }}</h3>
    <h6 v-if="error">{{ error }}</h6>
    <template v-else>
      <PostBlock :post="post" />
    </template>
    <div>
      <template v-if="!likeStatus">
        <font-awesome-icon icon="fa-regular fa-thumbs-up" size="2xl" @click="handleLike" />
      </template>
      <template v-else>
        <font-awesome-icon icon="fa-solid fa-thumbs-up" size="2xl" @click="handleLike" />
      </template>
      {{ post.Likes?.length }}
    </div>
    <template v-for="comment in post.Comments" >
      <div :key="comment.id">
        <h3>{{ comment.title }}</h3>
        <p>{{ comment.content }}</p>
        <button @click="handleDelete(comment.id)">Destroy</button>
      </div>
    </template>
    <form @submit.prevent="handleSubmit">
      <label>Title</label>
      <input type="text" required v-model="title">
      <label>Content</label>
      <input type="text" required v-model="content">
      <button type="submit">Submit</button>
    </form>

  </div>
</template>

<script>
import { getPost } from '@/hooks/PostHooks';
import PostBlock from '@/components/PostBlock.vue';
import {handleCommentDelete, handleCommentSubmit} from '@/hooks/CommentHooks'
import {handleLikeCount} from '@/hooks/LikeHooks';
import { ref } from 'vue';
import { fetchUserInfo } from '@/hooks/UserHooks';

export default {
  name: 'Post',
  props:['postId'],
  components: {PostBlock},
  setup(props){

    const title = ref('')
    const content = ref('')
    //the like issue needs fixing
    const likeStatus = ref(false)

    const { post, error } = getPost(props.postId)



    // const checkLike = async () => {
    //   const { user } = fetchUserInfo()
    //   await post.value.Likes?.map(like => {
    //     if (like.UserId === user.id) {
    //       likeStatus.value = true
    //     }
    //   })
    // }

    // checkLike()

    const handleSubmit = async () => {
      const {newPost, error} = await handleCommentSubmit(title.value, content.value, props.postId)
      if (Object.keys(newPost.value).length !== 0) {
        post.value.Comments.push(newPost.value)
      }
    }

    const handleDelete = (commentId) => {
      handleCommentDelete(commentId)
      post.value.Comments = post.value.Comments.filter(comment => comment.id !== commentId)
    }

    const handleLike = async () => {
      const {likeCheck} = await handleLikeCount(props.postId)
      if(likeCheck.value === true){
        post.value.Likes.push("hi")
      } else {
        post.value.Likes.pop()
      }
      likeStatus.value = likeCheck.value
    }

    return { post, error, title, content, likeStatus, handleSubmit, handleDelete, handleLike }
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
