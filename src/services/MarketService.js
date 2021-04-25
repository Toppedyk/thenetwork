import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { api } from './AxiosService'

class MarketService {
  async getAll() {
    try {
      const res = await api.get('/api/ads')
      AppState.market = res.data
    } catch (error) {
      Notification.toast('Error: ' + error, 'error')
    }
  }
}
export const marketService = new MarketService()
