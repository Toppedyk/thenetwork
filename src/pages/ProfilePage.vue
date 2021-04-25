<template>
  <div v-if="state.loading">
    Loading...
  </div>
  <div class="profilePage flex-grow-1" v-else>
    <div class="row">
      <div class="col-12 col-md-3">
        <AccountSummary />
      </div>
      <div class="col-12 col-md-6">
        <div class="card text-center" v-if="state.user.isAuthenticated && state.activeProfile.id === state.account._id">
          <div class="card-body">
            <form @submit.prevent="create">
              <div class="form-group">
                <textarea class="form-control"
                          id="body"
                          rows="3"
                          placeholder="Share Something..."
                          v-model="state.newPost.body"
                          required
                ></textarea>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" id="imgUrl" placeholder="Image URL" v-model="state.newPost.imgUrl">
              </div>
              <button type="submit" class="btn btn-success d-flex">
                Post!
              </button>
            </form>
          </div>
        </div>
        <Post v-for="post in state.activePosts" :key="post.id" :post="post" />
        <div class="d-flex justify-content-around">
          <button type="button" class="btn btn-secondary" v-if="state.newer" @click="nextPage(state.newer)">
            Newer
          </button>
          <button type="button" class="btn btn-info" v-if="state.older" @click="nextPage(state.older)">
            Older
          </button>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <Market v-for="market in state.markets" :key="market.id" :market="market" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { profileService } from '../services/ProfileService'
import { postService } from '../services/PostService'
import Notification from '../utils/Notification'
export default {
  name: 'Account',
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newPost: {},
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      activeProfile: computed(() => AppState.activeProfile),
      activePosts: computed(() => AppState.activePosts),
      markets: computed(() => AppState.market),
      older: computed(() => AppState.activeProfile.older),
      newer: computed(() => AppState.activeProfile.newer)
    })
    onMounted(async() => {
      await profileService.getProfileById(route.params.id)
      await postService.getPostsById(route.params.id)
      state.loading = false
    })
    return {
      state,
      async create() {
        try {
          await postService.create(state.newPost)
          state.newPost = {}
          Notification.toast('Successfully Posted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async nextPage(url) {
        try {
          await postService.getAll(url)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async lastPage(url) {
        try {
          await postService.getAll(url)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
