<template>
  <div class="Post col">
    <div class="card">
      <div class="card-body">
        <router-link :to="{name: 'ProfilePage', params:{id: post.creator.id}}">
          <div class="d-flex" @click="setActive(post.creator.id)">
            <img :src="post.creator.picture" alt="" class="small-img rounded-circle mr-3">
            <h5 class="card-title" @click="setActive(post.creator.id)">
              {{ post.creator.name }}
            </h5>
          </div>
        </router-link>
        <div class="d-flex">
          <p>
            {{ new Date(post.createdAt).toLocaleString("en",options) }}
          </p>
        </div>
        <p class="card-text">
          {{ post.body }}
        </p>
      </div>
      <div v-if="post.imgUrl">
        <img :src="post.imgUrl" class="card-img" alt="">
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <i class="fas fa-heart mx-2" @click="likePost(post.id, post.creator.id)"></i> {{ post.likes.length }}
        </div>
        <i class="fas fa-trash-alt ml-4 mr-1" v-if="state.account.id === post.creator.id" @click="deletePost(post.id, post.creator.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { postService } from '../services/PostService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      activeProfile: computed(() => AppState.activeProfile)
    })
    return {
      state,
      options: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      },
      async setActive(id) {
        try {
          await profileService.getProfileById(id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async likePost(id, creator) {
        try {
          await postService.likePost(id, creator)
          Notification.toast('Succesfully Liked', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deletePost(id, creator) {
        try {
          await postService.deletePost(id, creator)
          Notification.toast('Succesfully Deleted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.small-img{
  height:2em;
  width: 2em;
}

.card{
  position: relative;
}

</style>
