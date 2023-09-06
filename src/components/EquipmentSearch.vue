<template>
    <form class="flex gap-2 items-end mb-4">
        <div>
            <label for="Area" class="title-label">地區</label>
            <input v-model="params.city" id="Area" type="text" class="input" placeholder="Area">
        </div>
        <!-- <div>
            <label for="ID" class="title-label">專案類型</label>
            <input v-model="params.id" id="ID" type="text" class="input" placeholder="ID">
        </div> -->
        <button class="btn bg-blue-600 flex justify-center gap-2 items-center hover:bg-blue-900" @click="search">
            <el-icon :size="15">
                <Search />
            </el-icon>
            <span>搜尋</span>
        </button>
    </form>
    <CircleLoading v-if="isLoading && data.length === 0" />
    <div class="info">
        <div class="flex flex-wrap">
            <div class="list" v-for="i in data " :key="i.id">
                <div :class="`border-2 rounded-lg ${checkValue(i.status)}`">
                    <div
                        :class="`border-b ${checkValue(i.status)} flex gap-2 items-center justify-center py-1 text-lg font-bold`">
                        <span class="font-bold">{{ i.city }}</span>
                        <el-icon>
                            <CaretRight />
                        </el-icon>{{ i.id }}
                    </div>
                    <div class="text-center">{{ i.latestUpdate }}</div>
                    <table class="min-w-full text-sm">
                        <thead :class="`${checkValue(i.status)} border-t border-b`">
                            <tr class="text-center">
                                <th scope="col" class="px-3 py-2">TMP</th>
                                <th scope="col" class="px-3 py-2">HUM</th>
                                <th scope="col" class="px-3 py-2">PM<sub>2.5</sub></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center text-lg">
                                <td class="px-3 py-2" v-for="v in i.value" :key="v">{{ v }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <span v-if="isSearch && !data.length" class="font-bold text-xl">查無結果 !</span>
</template>
<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from "vue"
const app = getCurrentInstance()?.appContext.config.globalProperties
const isLoading = ref(false)
const isSearch = ref(false)
const params = reactive({
    city: ""
})
let data = reactive<any[]>([])
const checkValue = (value: string) => {
    switch (value) {
        case 'disconnect':
            return 'border-red-500'
        case 'online':
            return 'border-green-500'
        case 'abnormal':
            return 'border-[orange]'
    }
}
const search = () => {
    const { city } = params
    if (city) {
        isLoading.value = true
        app?.$axios("/query", { params: { ...params, type: 'equipment' } })
            .then((res: any) => {
                data = res.data.data
                isLoading.value = false
                isSearch.value = true
            })
    } else {
        alert("地區或ID不能為空")
    }
}
</script>
<style scoped lang="scss">
.list {
    @apply py-1 pr-2 w-full sm: w-1/2 md:w-1/4 xl:w-1/8;
}
</style>