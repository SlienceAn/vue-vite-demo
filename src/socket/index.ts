import Pusher from 'pusher-js'
import { usePusherStore } from '@/store'


const createPuser = () => {
  const init = () => {
    const pusherStore = usePusherStore()
    const key = import.meta.env.VITE_PUSHER_KEY
    const cluster = import.meta.env.VITE_PUSHER_CLUSTER
    const pusher = new Pusher(key, { cluster })

    // 訂閱頻道
    const channel = pusher.subscribe('Setting')

    // 綁定事件
    channel.bind('update-event', (chunk) => {
      console.log('pusher =>', chunk)
      pusherStore.$patch({
        data: chunk
      })
    })

    // 錯誤處理
    pusher.connection.bind('error', (err) => {
      console.log('pusher error', err)
    })
  }
  const disconnect = () => {

  }
  return {
    init,
    disconnect
  }
}

export default createPuser()
// console.log('Pusher', Pusher)

// const key = import.meta.env.PUSHER_KEY
// const cluster = import.meta.env.PUSHER_CLUSTER
// const pusherStore = usePusherStore()
// const { data } = storeToRefs(pusherStore)
// const pusher = new Pusher(key, {
//   cluster,
// })

// // 訂閱頻道
// const channel = pusher.subscribe('test-channel')

// channel.bind('my-event', (chunk) => {
//   console.log('pusher =>', chunk)
//   data.value = chunk

// })

// pusher.connection.bind('error', (error) => {
//   console.error('連接錯誤:', error)
// })

// export const getPusher = () => pusher