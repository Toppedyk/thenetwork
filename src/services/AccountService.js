import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
//  import Notification from '../utils/Notification'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async edit(data) {
    try {
      await api.put('/account', data)
      this.getAccount()
    } catch (error) {
      Notification.toast('Error: ' + error, 'error')
    }
  }
}

export const accountService = new AccountService()
