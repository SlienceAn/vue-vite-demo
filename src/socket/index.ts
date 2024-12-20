import Pusher, { Channel } from 'pusher-js'
import { ElNotification, dayjs } from 'element-plus'
import config from '@/config'
const { key, cluster, PUSER_ERROR, PUSHER_SUCCESS } = config
const pusher = new Pusher(key, { cluster })

let settingChannel: Channel | null = null
let notificationChannel: Channel | null = null
// 缺驗證
const createPuser = () => {
  const init = () => {
    const userStore = useUserForm()

    // 先清理可能存在的舊訂閱
    if (settingChannel) {
      settingChannel.unbind_all()
      pusher.unsubscribe('Setting')
    }

    if (notificationChannel) {
      notificationChannel.unbind_all()
      pusher.unsubscribe('notification')
    }

    // 等待連接成功後再訂閱
    pusher.connection.bind('connected', () => {
      userStore.$patch({ isConnect: true })
      settingChannel = pusher.subscribe('setting')
      notificationChannel = pusher.subscribe('notification') // 最新消息頻道

      // 帳戶管理頻道
      settingChannel
        .bind(PUSHER_SUCCESS, () => {
          userStore.getAll()
        })
        .bind(PUSER_ERROR, (error) => {
          console.log('pusher error', error)
          userStore.$patch({ isConnect: false })
        })
        .bind('update', (chunk) => {
          userStore.$patch({ data: chunk })
        })

      // 最新消息頻道
      notificationChannel
        .bind(PUSHER_SUCCESS, () => {
          console.log('通知訂閱成功')
        })
        .bind(PUSER_ERROR, () => {
          console.log('通知訂閱失敗')
        })
        .bind('update', (chunk) => {
          ElNotification({
            type: chunk.type,
            title: chunk.title,
            message: `${chunk.message} ${dayjs(chunk.date).format('YYYY-MM-DD HH:mm')}`
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
