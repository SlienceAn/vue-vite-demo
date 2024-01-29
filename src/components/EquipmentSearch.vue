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
                <div :class="`border-2 rounded-lg ${checkValue(i.value.PM25)}`">
                    <div
                        :class="`border-b ${checkValue(i.value.PM25)} flex gap-2 items-center justify-center py-1 text-lg font-bold`">
                        <span class="font-bold">{{ i.city }}</span>
                        <el-icon>
                            <CaretRight />
                        </el-icon>
                        {{ i.id }}
                    </div>
                    <div class="text-center">{{ i.latestUpdate }}</div>
                    <table class="min-w-full text-sm">
                        <thead :class="`${checkValue(i.value.PM25)} border-t border-b`">
                            <tr class="text-center">
                                <th scope="col" class="px-3 py-2">TMP</th>
                                <th scope="col" class="px-3 py-2">HUM</th>
                                <th scope="col" class="px-3 py-2">PM<sub>2.5</sub></th>
                            </tr>
                        </thead>
                        <tbody :class="`border-b ${checkValue(i.value.PM25)}`">
                            <tr class="text-center text-lg">
                                <td class="px-3 py-2" v-for="v in i.value" :key="v">{{ v }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="loginStore.isPremission" class="py-1 text-center">
                        <el-button type="info" plain @click="modify(0, i.id)">修改測值</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <span v-if="isSearch && !data.length" class="font-bold text-xl">查無結果 !</span>
    <el-dialog v-model="isDialog" title="修改測值" width="50%" top="2vh">
        <div class="border">
            <label for="TMP" class="mr-1">
                <span>TMP</span>
                <input id="TMP" class="input-value" type="text" v-model="modifyValue.TMP" />
            </label>
            <label for="HUM" class="mr-1">
                <span>HUM</span>
                <input id="HUM" class="input-value" type="text" v-model="modifyValue.HUM" />
            </label>
            <label for="PM">
                <span>PM<sub>2.5</sub></span>
                <input id="PM" class="input-value" type="text" v-model="modifyValue.PM25" />
            </label>
        </div>
        <div class="text-left py-2">
            <el-button type="primary" @click="modify(1, '')">確認</el-button>
        </div>
    </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from "vue"
import { ElMessage } from 'element-plus'
import { useLoginStore } from '../store'
//note
const app = getCurrentInstance()?.appContext.config.globalProperties
const isLoading = ref(false)
const isSearch = ref(false)
const isDialog = ref(false)
const loginStore = useLoginStore()
const params = reactive({
    city: "台北"
})
const modifyValue = reactive({
    id: "",
    TMP: "",
    HUM: "",
    PM25: ""
})
let data = reactive<any[]>([])
const checkValue = (value: number) => {
    let color = '';
    value > 50 ? color = 'border-red-500' : color = 'border-green-500'
    return color
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
        ElMessage.error("請輸入查詢地區")
    }
}
const modify = (type: number, id: "") => {
    if (type === 0) {
        isDialog.value = true
        modifyValue.id = id
    }
    if (type === 1) {
        app?.$axios("/modify/value", { params: { ...modifyValue } }).then(() => isDialog.value = false)
    }
}
</script>
<style scoped lang="scss">
.list {
    @apply py-1 pr-2 w-full sm: w-1/2 md:w-1/4 xl:w-1/8;
}

.input-value {
    @apply shadow appearance-none border rounded p-1 text-gray-700;
}
</style>