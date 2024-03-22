import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { faThumbsUp as LikeThumb } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as LikedThumb } from '@fortawesome/free-solid-svg-icons'
import { faMessage as Message } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(LikeThumb, LikedThumb, Message)
createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
