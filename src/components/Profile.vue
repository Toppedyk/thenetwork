<template>
  <div class="Profile col">
    <div class="card">
      <router-link :to="{name: 'ProfilePage', params:{id: profile._id}}">
        <div class="card-body d-flex justify-content-center">
          <img :src="profile.picture" class="small-img m-2 rounded-circle">
          <h5 class="card-title m-2">
            {{ profile.name }}
          </h5>
        </div>
      </router-link>
      <div>
        <h6 class="ml-3">
          Contact info:
        </h6>
        <ul>
          <li>
            {{ profile.email }}
          </li>
          <li v-if="profile.github">
            {{ profile.github }}
          </li>
          <li v-if="profile.linkedin">
            {{ profile.linkedin }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Profile',
  props: {
    profile: {
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
      state
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
