import { defineStore } from 'pinia'
import { AxiosRequestConfig } from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { httpRequest } from '../api/api'
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

interface informationConfig {
    isLoading: boolean
    onlineData: Array<{
        [Key: string]: string | number
    }>
    disconnectData: Array<{
        [Key: string]: string | number
    }>
    abnormalData: Array<{
        [Key: string]: string | number
    }>
}
//設備資訊
export const useInformation = defineStore('information', {
    state: (): informationConfig => ({
        isLoading: true,
        onlineData: [],
        disconnectData: [],
        abnormalData: [],
    }),
    actions: {
        async getAbnormal() {
            const data = await httpRequest('/device/abnormal')
            this.abnormalData = data
        },
        async getDisconnect() {
            const data = await httpRequest('/device/disconnect')
            this.disconnectData = data
        },
        async getOnline() {
            const data = await httpRequest('/device/online')
            this.onlineData = data
        }
    },
    getters: {
        countList: (state) => {
            return [
                {
                    title: "總機台數量",
                    type: "Total",
                    message: state.onlineData.length + state.disconnectData.length + state.abnormalData.length,
                    icon: "InfoFilled",
                    color: "blue",
                },
                {
                    title: "已連線",
                    type: "online",
                    message: state.onlineData.length,
                    icon: "SuccessFilled",
                    color: "green",
                },
                {
                    title: "連線異常",
                    type: "abnormal",
                    message: state.abnormalData.length,
                    icon: "WarningFilled",
                    color: "orange",
                },
                {
                    title: "已斷線",
                    type: "disconnect",
                    message: state.disconnectData.length,
                    icon: "CircleCloseFilled",
                    color: "red",
                }
            ]
        }
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
