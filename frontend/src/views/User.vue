<template>
  <h3>User</h3>
  <h4>{{ user.id }}</h4>
  <form @submit.prevent="handleSubmit">
    <label>Upload avatar</label>
    <input type="file" name="image" ref="image" accept="image/*" @change="previewImage"/>
    <button type="submit">Submit</button>
  </form>
  <img :src="imagePreview"/>
</template>

<script>
import { fetchUserInfo, uploadImage } from '@/hooks/UserHooks';
import { ref } from 'vue';

export default {
  name:'User',
  setup(){

    const imagePreview = ref(null)
    const imageUpload = ref(null)

    const {user,error} = fetchUserInfo()

    const previewImage = (e) => {
      imageUpload.value = e.target.files[0]
      const image = e.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        imagePreview.value = e.target.result;
      };
    }

    const handleSubmit = () => {
      console.log(imageUpload.value)
      const formData = new FormData()
      formData.append('image', imageUpload.value)
      uploadImage(formData)
    }

    return {user, error, imagePreview, previewImage, handleSubmit}
  }
}
</script>

<style>

</style>
