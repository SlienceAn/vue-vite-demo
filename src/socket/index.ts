import Pusher from 'pusher-js'
import { useUserForm } from '@/store'

const key = import.meta.env.VITE_PUSHER_KEY
const cluster = import.meta.env.VITE_PUSHER_CLUSTER
const pusher = new Pusher(key, { cluster })
const PUSHER_SUCCESS = 'pusher:subscription_succeeded'
const PUSER_ERROR = 'pusher:subscription_error'

const createPuser = () => {
  const init = () => {
    const userStore = useUserForm()
    // 訂閱頻道
    const settingChannel = pusher.subscribe('Setting')

    settingChannel.bind(PUSHER_SUCCESS, () => {
      userStore.getAll()
    })

    settingChannel.bind(PUSER_ERROR, (error) => {
      console.log('pusher error', error)
    })
    // 綁定事件
    settingChannel.bind('update-event', (chunk) => {
      userStore.$patch({
        data: chunk
      })
    })

    // 錯誤處理
    pusher.connection.bind('error', (err) => {
      console.log('pusher error', err)
    })
  }
  const disconnect = () => {
    // 完全斷開連接
    pusher.disconnect()
  }
  return {
    init,
    disconnect
  }
}

export default createPuser()
