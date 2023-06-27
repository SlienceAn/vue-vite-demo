<template>
    <form class="flex gap-2 items-end">
        <div>
            <label for="Area" class="title-label">Area</label>
            <input v-model="item.area" id="Area" type="text" class="input" placeholder="area">
        </div>
        <div>
            <label for="ID" class="title-label">ID</label>
            <input v-model="item.id" id="ID" type="text" class="input" placeholder="id">
        </div>
        <button class="btn bg-blue-600 flex justify-center gap-2 items-center hover:bg-blue-900">
            <el-icon :size="15">
                <Search />
            </el-icon>
            <span>Search</span>
        </button>
    </form>
    <form class="py-2 m-0">
        <span class="inline-flex items-center gap-1 mr-1">
            <input id="error" type="checkbox" class="w-4 h-4"/>
            <label for="error">數值異常</label>
        </span>
        <span class="inline-flex items-center gap-1">
            <input id="empty" type="checkbox" class="w-4 h-4"/>
            <label for="empty">無數值</label>
        </span>
    </form>
    <div class="flex flex-wrap">
        <div class="list" v-for="i in 30" :key="i">
            <div class="border-2 border-blue-500 rounded-lg">
                <div class="px-2 py-1 text-lg text-center">2022-04-04 13:00 {{ i }}</div>
                <table class="min-w-full text-sm border-t">
                    <thead class="border-b  border-blue-500">
                        <tr class="text-center">
                            <th scope="col" class="px-3 py-2 border-r  border-blue-500">TMP</th>
                            <th scope="col" class="px-3 py-2 border-r  border-blue-500">HUM</th>
                            <th scope="col" class="px-3 py-2 border-r">PM<sub>2.5</sub></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center text-lg">
                            <td class="px-3 py-2 border-r  border-blue-500">34</td>
                            <td class="px-3 py-2 border-r  border-blue-500">13</td>
                            <td class="px-3 py-2">22</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue"

const item = reactive({
    area: "",
    id: ""
})
const data = reactive([{
    id: 0,
    date: "",
    content: [{
        type: "",
        value: "",
        count: ""
    }]
}])

onMounted(() => {
    for (let i = 0; i < 5; i++) {
        data.push({
            id: i,
            date: "",
            content: [{
                type: "",
                value: "",
                count: ""
            }]
        })
    }
    console.log(data)
})
</script>
<style scoped lang="scss">
.list {
    @apply py-1 pr-2 w-full sm: w-1/2 md:w-1/4 xl:w-1/8;
}
</style>