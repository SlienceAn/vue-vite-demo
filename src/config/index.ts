export default {
  name: 'AIOT(demo)',
  key: import.meta.env.VITE_PUSHER_KEY,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  PUSHER_SUCCESS: 'pusher:subscription_succeeded',
  PUSER_ERROR: 'pusher:subscription_error'
}