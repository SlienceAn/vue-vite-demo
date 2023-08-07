import { defineStore } from 'pinia'

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

//調用 $patch 方法。它允許您使用部分 “state” 物件同時應用多個更改：
//調用 $reset 方法，將狀態重置到其初始值