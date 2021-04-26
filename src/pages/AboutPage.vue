<template>
  <div v-if="state.loading=false">
    Loading...
  </div>
  <div class="about flex-grow-1" v-else>
    <div class="row">
      <div class="col-12 col-md-3 ">
        <AccountSummary />
      </div>
      <div class="col-12 col-md-6 scroll">
        <h1 class="text-center" v-if="state.posts.length>0">
          Posts
        </h1>
        <h1 v-else>
          No posts match that search...
        </h1>
        <Post v-for="post in state.posts" :key="post.id" :post="post" />
        <h1 class="text-center" v-if="state.profiles.length>0">
          Profiles
        </h1>
        <h1 v-else>
          No profiles match that search...
        </h1>
        <Profile v-for="profile in state.profiles" :key="profile.id" :profile="profile" />
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
import { postService } from '../services/PostService'
import { marketService } from '../services/MarketService'
import Notification from '../utils/Notification'
export default {
  components: {},
  name: 'Home',
  setup() {
    const state = reactive({
      loading: true,
      posts: computed(() => AppState.searchPosts),
      profiles: computed(() => AppState.searchProfiles),
      markets: computed(() => AppState.market),
      older: computed(() => AppState.older),
      newer: computed(() => AppState.newer)
    })
    onMounted(async() => {
      try {
        await postService.getAll()
        await marketService.getAll()
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
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

.scroll{
  height: 80vh;
  overflow-y:auto;
}
h1{
  font-size: 1em;
}
</style>
