import { LocalStorage } from 'quasar'

export default {
  token: LocalStorage.has('token') ? LocalStorage.get.item('token') : null,
  connected: function () { if (LocalStorage.has('user')) { return true } else { return false } },
  userSession: LocalStorage.has('user') ? LocalStorage.get.item('user') : null,
  apiHeader: {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': LocalStorage.has('token') ? LocalStorage.get.item('token') : null
    }
  }
}
