import { defineStore } from 'pinia'

//調用 $patch 方法。它允許您使用部分 “state” 物件同時應用多個更改：
//調用 $reset 方法，將狀態重置到其初始值
export const useCounter = defineStore('counter', {
    // 推薦使用 完整類型推斷的箭頭函數
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
    }
})

export const useForm = defineStore('inspectForm', {
    state: (): any => ({
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
        remove(index: number) {
            this.form.slice(0, index)
        }
    }
})
