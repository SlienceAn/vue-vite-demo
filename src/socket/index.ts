import Pusher, { Channel } from 'pusher-js'
import { useUserForm } from '@/store'

const key = import.meta.env.VITE_PUSHER_KEY
const cluster = import.meta.env.VITE_PUSHER_CLUSTER
const pusher = new Pusher(key, { cluster })
const PUSHER_SUCCESS = 'pusher:subscription_succeeded'
const PUSER_ERROR = 'pusher:subscription_error'

let settingChannel: Channel | null = null

const createPuser = () => {
  const init = () => {
    const userStore = useUserForm()

    // 先清理可能存在的舊訂閱
    if (settingChannel) {
      settingChannel.unbind_all()
      pusher.unsubscribe('Setting')
    }

    // 等待連接成功後再訂閱
    pusher.connection.bind('connected', () => {
      console.log('Pusher 已連接')

      // 訂閱頻道
      settingChannel = pusher.subscribe('Setting')
      // 訂閱成功事件
      settingChannel.bind(PUSHER_SUCCESS, () => {
        console.log('訂閱成功')
        userStore.getAll()
        userStore.$patch({ isConnect: true })
      })

      // 訂閱錯誤事件
      settingChannel.bind(PUSER_ERROR, (error) => {
        console.log('pusher error', error)
        userStore.$patch({ isConnect: false })
      })

      // 綁定更新事件
      settingChannel.bind('update-event', (chunk) => {
        userStore.$patch({ data: chunk })
      })
    })

    // 錯誤處理
    pusher.connection.bind('error', (err) => {
      console.log('pusher error', err)
      userStore.$patch({ isConnect: false })
    })

    // 處理連接
    if (pusher.connection.state === 'disconnected') {
      pusher.connect()
    }
  }

  const disconnect = () => {
    const userStore = useUserForm()
    pusher.disconnect()
    userStore.$patch({ isConnect: false })
  }
  return {
    init,
    disconnect
  }
}

export default createPuser()
