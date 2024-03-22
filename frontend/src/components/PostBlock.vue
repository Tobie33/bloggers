<template>
  <div class="post-block">
    <div id="post-title">
      <h3>{{ post.title }}</h3>
    </div>
    <div id="post-content">
      <p>{{ post.content }}</p>
      <div>
        <font-awesome-icon icon="fa-regular fa-thumbs-up" /> {{ post.Likes?.length }}
        <font-awesome-icon icon="fa-regular fa-message" />{{ post.Comments?.length }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostBlock',
  props:['post'],
  setup(){

  }
}
</script>

<style>
.post-block{

  min-height:175px;
  width:450px;
}

#post-title{
  background-color: #B2B5E0;
  border-radius:10px 10px 0 0;
  padding: 10px 0;
}
p{
  margin-top:0;
}
#post-content{
  border-radius:0 0 10px 10px ;
  min-height:150px;
  background-color: #F8F6F0;
  padding:15px;
}

h3{
  margin:0;
}

</style>
