import { defineStore } from 'pinia'
import { httpRequest } from '../api/api'
import router from '../router'
//調用 $patch 方法。它允許您使用部分 “state” 物件同時應用多個更改
//調用 $reset 方法，將狀態重置到其初始值
//state推薦使用 完整類型推斷的箭頭函數


export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        citylist: [],
    }),
    actions: {
        async getCity() {
            const data = await httpRequest('/city')
            this.citylist = data.data
        }
    }
})
//登入
type loginResponse = {
    account: string,
    password: string,
    success: boolean,
    userName: string,
    message: string,
    isPremission: boolean,
    data: any
}
export const useLoginStore = defineStore('loginStore', {
    state: (): loginResponse => ({
        account: 'rd',
        password: '123',
        userName: "",
        success: false,
        data: [],
        message: '',
        isPremission: false
    }),
    actions: {
        async postLogin() {
            const data = await httpRequest('/login', { method: 'POST', data: { account: this.account, password: this.password } })
            this.data = data
            if (this.data.success) router.replace('/Main/information')
        }
    },
    persist: true
})

//設備資訊
interface informationConfig {
    isLoading: boolean
    allData: Array<{
        [Key: string]: string | number
    }>
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
export const useInformation = defineStore('information', {
    state: (): informationConfig => ({
        isLoading: true,
        allData: [],
        onlineData: [],
        disconnectData: [],
        abnormalData: [],
    }),
    actions: {
        async getAll() {
            const data = await httpRequest('/device')
            this.allData = data.data
        },
        async getAbnormal() {
            const data = await httpRequest('/device/abnormal')
            this.abnormalData = data.data
        },
        async getDisconnect() {
            const data = await httpRequest('/device/disconnect')
            this.disconnectData = data.data
        },
        async getOnline() {
            const data = await httpRequest('/device/online')
            this.onlineData = data.data
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
                    color: "info",
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
