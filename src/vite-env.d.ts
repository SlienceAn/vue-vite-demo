/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PUSHER_APPID: string,
    readonly VITE_PUSHER_KEY: string,
    readonly VITE_PUSHER_SECRET: string,
    readonly VITE_PUSHER_CLUSTER: string
}
declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv
    }
}
