<template>
  <div v-if="state.loading">
    Loading...
  </div>
  <div class="profilePage flex-grow-1" v-else>
    <div class="row">
      <div class="col-12 col-md-3">
        <AccountSummary />
      </div>
      <div class="col-12 col-md-6 scroll">
        <div class="card w-100 bg-light">
          <img :src="state.activeProfile.coverImg" class="card-img-top head-img" alt="..." v-if="state.activeProfile.coverImg">
          <img src="https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg" class="card-img-top head-img img-fluid" alt="..." v-else>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">
                <img :src="state.activeProfile.picture" class="rounded-circle small-img">
                {{ state.activeProfile.name }}
                <i class="fas fa-user-graduate" v-if=" state.activeProfile.graduated===true"></i>
              </h5>
              <div>
                <i class="fab fa-github m-2" v-if="state.activeProfile.github"></i>
                <i class="fab fa-linkedin m-2" v-if="state.activeProfile.linkedin"></i>
                <i class="far fa-file-alt m-2" v-if="state.activeProfile.resume"></i>
              </div>
            </div>
            <div v-if="state.activeProfile.class">
              <h6>{{ state.activeProfile.class }}</h6>
            </div>
            <p class="card-text" v-if="state.activeProfile.bio">
              {{ state.activeProfile.bio }}
            </p>
          </div>
        </div>
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
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.head-img{
  max-height: 10em;
  object-fit: cover;
}

.scroll{
  height: 80vh;
  overflow-y:auto;
}

.small-img{
  height:2em;
  width: 2em;
  object-fit: cover;
}
</style>
