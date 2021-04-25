import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  market: [],
  posts: [],
  activeProfile: null,
  activePosts: [],
  older: null,
  newer: null,
  searchPosts: [],
  searchProfiles: []
})
