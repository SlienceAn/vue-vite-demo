<template>
    <form class="flex gap-2 items-end">
        <div>
            <label for="Area" class="title-label">地區</label>
            <select v-model="item.area" id="Area" type="text" class="select" placeholder="areaddddddd">
                <option>高雄</option>
                <option>台南</option>
                <option>嘉義</option>
                <option>雲林</option>
            </select>
        </div>
        <div>
            <label for="ID" class="title-label">ID</label>
            <input v-model="item.id" id="ID" type="text" class="input" placeholder="ID">
        </div>
        <button class="btn bg-blue-600 flex justify-center gap-2 items-center hover:bg-blue-900" @click="search">
            <el-icon :size="15">
                <Search />
            </el-icon>
            <span>搜尋</span>
        </button>
    </form>
    <CircleLoading v-if="isLoading" />
    <div v-if="data.length !== 0" class="info">
        <form class="py-2 m-0">
            <span class="inline-flex items-center gap-1 mr-1">
                <input id="error" type="checkbox" class="w-4 h-4" v-model="isNormal">
                <label for="error" class="hover:cursor-pointer">數值異常</label>
            </span>
            <span class="inline-flex items-center gap-1">
                <input id="empty" type="checkbox" class="w-4 h-4" v-model="isEmpty" />
                <label for="empty" class="hover:cursor-pointer">無數值</label>
            </span>
        </form>
        <div class="flex flex-wrap">
            <div class="list" v-for=" i  in  data " :key="i.date">
                <div :class="`border-2 rounded-lg ${checkValue(i.value.PM25)}`">
                    <div class="px-2 py-1 text-lg text-center">{{ i.date }}</div>
                    <table class="min-w-full text-sm">
                        <thead :class="`${checkValue(i.value.PM25)} border-t border-b`">
                            <tr class="text-center">
                                <th scope="col" class="px-3 py-2">TMP</th>
                                <th scope="col" class="px-3 py-2">HUM</th>
                                <th scope="col" class="px-3 py-2">PM<sub>2.5</sub></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center text-lg">
                                <td class="px-3 py-2">{{ i.value.TMP }}</td>
                                <td class="px-3 py-2">{{ i.value.HUM }}</td>
                                <td class="px-3 py-2">{{ i.value.PM25 }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from "vue"
import { fakerZH_TW } from '@faker-js/faker'
type Data = {
    date: any,
    status: "ok" | "abnormal" | "empty"
    value: any
}
// const gData = getCurrentInstance()?.appContext.config.globalProperties;
// gData?.$axios("get") => 全域打API
const isLoading = ref(false)
const isEmpty = ref(true)
const isNormal = ref(true)
const item = reactive({
    area: "",
    id: ""
})

const data = reactive<Data[]>([])
const checkValue = (value: number): string => {
    if (value > 50) {
        return 'border-red-500'
    } else {
        return 'border-green-500'
    }
}
const search = () => {
    isLoading.value = true
    setTimeout(() => {
        for (let i = 0; i < 30; i++) {
            data.push({
                date: fakerZH_TW.date.recent(),
                status: "ok",
                value: {
                    TMP: "-",
                    HUM: "-",
                    PM25: Math.floor(Math.random() * 100)
                }
            })
        }
        isLoading.value = false
    }, 2000)
}
</script>
<style scoped lang="scss">
.list {
    @apply py-1 pr-2 w-full sm: w-1/2 md:w-1/4 xl:w-1/8;
}
</style>