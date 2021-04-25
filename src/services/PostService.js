import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostService {
  async getAll(url = 'api/posts') {
    const res = await api.get(url)
    AppState.posts = res.data.posts
    AppState.older = res.data.older
    AppState.newer = res.data.newer
  }

  async getPostsById(id) {
    const res = await api.get(`api/profiles/${id}/posts/`)
    AppState.activePosts = res.data.posts
    AppState.older = res.data.older
    AppState.newer = res.data.newer
  }

  async create(data) {
    const res = await api.post('api/posts', data)
    this.getPostsById(res.data.creatorId)
  }

  async likePost(id, creator) {
    await api.post(`api/posts/${id}/like`)
    this.getAll()
    this.getPostsById(creator)
  }

  async deletePost(id, creator) {
    await api.delete(`api/posts/${id}`)
    this.getAll()
    this.getPostsById(creator)
  }

  async search(query) {
    const res = await api.get(`api/posts/?query=${query}`)
    AppState.searchPosts = res.data.posts
  }
}
export const postService = new PostService()
