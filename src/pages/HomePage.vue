<template>
  <div v-if="state.loading">
    Loading...
  </div>
  <div class="home flex-grow-1 " v-else>
    <div class="row">
      <div class="col-12 col-md-3  ">
        <AccountSummary />
      </div>
      <div class="col-12 col-md-6 scroll">
        <Post v-for="post in state.posts" :key="post.id" :post="post" />
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
import { postService } from '../services/PostService'
import { marketService } from '../services/MarketService'
import Notification from '../utils/Notification'
export default {
  components: {},
  name: 'Home',
  setup() {
    const state = reactive({
      loading: true,
      posts: computed(() => AppState.posts),
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
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}

.scroll{
  height: 80vh;
  overflow-y:auto;
}

</style>
