import Pusher, { Channel } from 'pusher-js'
import { ElNotification } from 'element-plus'

const key = import.meta.env.VITE_PUSHER_KEY
const cluster = import.meta.env.VITE_PUSHER_CLUSTER
const pusher = new Pusher(key, { cluster })
const PUSHER_SUCCESS = 'pusher:subscription_succeeded'
const PUSER_ERROR = 'pusher:subscription_error'

let settingChannel: Channel | null = null
let notificationChannel: Channel | null = null

const createPuser = () => {
  const init = () => {
    const userStore = useUserForm()
    const notificationStore = useNotification()

    // 先清理可能存在的舊訂閱
    if (settingChannel) {
      settingChannel.unbind_all()
      pusher.unsubscribe('Setting')
    }

    // 等待連接成功後再訂閱
    pusher.connection.bind('connected', () => {

      settingChannel = pusher.subscribe('Setting')
      notificationChannel = pusher.subscribe('notification-channel') // 最新消息頻道

      // 帳戶管理頻道
      settingChannel
        .bind(PUSHER_SUCCESS, () => {
          userStore.getAll()
          userStore.$patch({ isConnect: true })
        })
        .bind(PUSER_ERROR, (error) => {
          console.log('pusher error', error)
          userStore.$patch({ isConnect: false })
        })
        .bind('update-event', (chunk) => {
          userStore.$patch({ data: chunk })
        })

      // 最新消息頻道
      notificationChannel
        .bind(PUSHER_SUCCESS,()=>{
          console.log('通知訂閱成功')
        })
        .bind(PUSER_ERROR,()=>{
          console.log('通知訂閱失敗')
        })
        .bind('notification-event', (chunk) => {
          notificationStore.addList(chunk)
          ElNotification({
            type: 'info',
            message: chunk.message
          })
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
