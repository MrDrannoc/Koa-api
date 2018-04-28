import { LocalStorage } from 'quasar'

export default {
  token: LocalStorage.has('token') ? LocalStorage.get.item('token') : null,
  connected: false,
  userSession: {},
  apiHeader: {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': LocalStorage.has('token') ? LocalStorage.get.item('token') : null
    }
  }
}
