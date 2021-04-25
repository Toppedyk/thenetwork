import { AppState } from '../AppState'
import { api } from './AxiosService'
import router from '../router'

class ProfileService {
  async getProfileById(id) {
    const res = await api.get('/api/profiles/' + id)
    AppState.activeProfile = res.data
  }

  async search(query) {
    const res = await api.get(`api/profiles/?query=${query}`)
    AppState.searchProfiles = res.data
    router.push({ name: 'About' })
  }
}
export const profileService = new ProfileService()
