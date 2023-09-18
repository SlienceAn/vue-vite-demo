import { defineStore } from 'pinia'
import { AxiosRequestConfig } from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { ElMessage } from 'element-plus'

//調用 $patch 方法。它允許您使用部分 “state” 物件同時應用多個更改：
//調用 $reset 方法，將狀態重置到其初始值
//state推薦使用 完整類型推斷的箭頭函數

type loginResponse = {
    success: boolean,
    userName: string,
    message: string,
    isPremission: boolean,
    data: any
}

//登入
export const useLoginStore = defineStore('loginStore', {
    state: (): loginResponse => ({
        userName: "",
        success: false,
        data: [],
        message: '',
        isPremission: false
    }),
    actions: {
        async postLogin(url: string, config: AxiosRequestConfig = {}) {
            const { data: response } = await useAxios(url, config)
            const { success, userName, data, isPremission } = response.value
            this.success = success
            if (success) {
                this.userName = userName
                this.data = data
                this.isPremission = isPremission
            } else {
                ElMessage.error('登入失敗，帳號密碼錯誤')
            }
        }
    },
    persist: true
})
//設備資訊
export const useInformation = defineStore('information', {
    state: (): any => ({
        isLoading: true,
        onlineData: [],
        disconnectData: null,
        abnormalData: [],
    }),
    actions: {
        async getInformation() {
            const { data: onlineData } = await useAxios('/device/online')
            const { data: disconnectData } = await useAxios('/device/disconnect')
            const { data: abnormalData } = await useAxios('/device/abnormal')
            this.onlineData = onlineData.value['data']
            this.disconnectData = disconnectData.value['data']
            this.abnormalData = abnormalData.value['data']
            this.isLoading = false
        }
    },
    getters: {
        //     disconnect: (state) => {
        //         const arr = state.disconnectData.map((el: any, idx: number, arr: any[]) => {
        //             const dayDiff = new Date().getTime() - new Date(el['latestUpdate']).getTime()
        //             arr[idx]['total'] = useRound(dayDiff / 1000 / 60 / 60 / 24)
        //             return arr
        //         })
        //         console.log(arr)
        //         return arr
        //     },
    }
})
export const useCounter = defineStore('counter', {
    state: () => {
        return {
            userName: "",
            status: "",
            item: [],
            isChange: false
        }
    },
    getters: {
        // doubleCount: (state) => state.count * 2
    },
    actions: {
        // increment() {
        //     this.count++
        // }
    },
    persist: true
})
type formConfig = {
    form: any[]
}
export const useForm = defineStore('inspectForm', {
    state: (): formConfig => ({
        form: []
    }),
    actions: {
        add(id: string, city: string, address: string) {
            this.form.push({
                id,
                city,
                address
            })
        },
    },
    persist: false
})
