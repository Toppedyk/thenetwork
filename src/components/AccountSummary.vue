<template>
  <div class="accountSummary mt-2">
    <div class="mb-3" v-if="user.isAuthenticated">
      <router-link :to="{name: 'ProfilePage', params:{id: state.account.id}}">
        <img :src="state.account.picture" class="rounded-circle small-img" alt="" @click="setActive(state.account.id)">
      </router-link>
    </div>
  </div>
  <div v-if="user.isAuthenticated">
    <h5>{{ state.account.name }}</h5>
    <ul>
      <li>
        {{ state.account.email }}
      </li>
      <li v-if="state.account.github">
        {{ state.account.github }}
      </li>
      <li v-if="state.account.linkedin">
        {{ state.account.linkedin }}
      </li>
    </ul>
    <div class="mb-2">
      <button type="button" class="btn btn-dark" @click="state.edit = true" v-if="state.edit===false">
        Edit Profile
      </button>
      <form v-else @submit.prevent="editProfile">
        <div class="form-group">
          <input type="text" class="form-control" id="name" placeholder="Name..." v-model="state.myProfile.name">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="picture" placeholder="Image..." v-model="state.myProfile.picture">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="state.myProfile.coverImg" id="coverImg" placeholder="Cover Image...">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="state.myProfile.email" id="email" placeholder="Email...">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="state.myProfile.github" id="github" placeholder="Github...">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="state.myProfile.linkedin" id="linkedin" placeholder="Linkedin...">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="state.myProfile.resume" id="resume" placeholder="Resume...">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" v-model="state.myProfile.bio" id="bio" placeholder="Bio...">
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-danger" @click="state.edit=false">
            Cancel
          </button>
          <button type="submit" class="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  <div>
    <span class="navbar-text">
      <button
        class="btn btn-outline-primary text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>

      <div class="dropdown" v-else>
        <div
          class="dropdown-toggle"
          @click="state.dropOpen = !state.dropOpen"
        >
          <img
            :src="user.picture"
            alt="user photo"
            height="40"
            class="rounded"
          />
          <span class="mx-3">{{ user.name }}</span>
        </div>
        <div
          class="dropdown-menu p-0 list-group w-100"
          :class="{ show: state.dropOpen }"
          @click="state.dropOpen = false"
        >
          <router-link :to="{ name: 'Account' }">
            <div class="list-group-item list-group-item-action hoverable">
              Account
            </div>
          </router-link>
          <div
            class="list-group-item list-group-item-action hoverable"
            @click="logout"
          >
            logout
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import Notification from '../utils/Notification'
import { postService } from '../services/PostService'
import { profileService } from '../services/ProfileService'
import { accountService } from '../services/AccountService'
export default {
  name: 'AccountSummary',
  setup() {
    const state = reactive({
      myProfile: {},
      edit: false,
      account: computed(() => AppState.account),
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      },
      async setActive(id) {
        try {
          await postService.getPostsById(id)
          await profileService.getProfileById(id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async editProfile() {
        try {
          await accountService.edit(state.myProfile)
          state.myProfile = {}
          state.edit = false
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
  height: 10em;
  width: 10em;
}

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}

</style>
