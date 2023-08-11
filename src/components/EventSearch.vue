<template>
    <form class="flex gap-2 mb-4 items-end">
        <label>
            <h4 class="title-label">選擇日期</h4>
            <div>
                <el-date-picker id="w" v-model="params.dateTime" type="daterange" value-format="YYYY-MM-DD"
                    range-separator="~" start-placeholder="起始日期" end-placeholder="結束日期" />
            </div>
        </label>
        <label>
            <h4 class="title-label">事件類型</h4>
            <select class="select shadow-0 border-gray-400" v-model="params.type">
                <option value="">連線異常</option>
                <option value="">斷線</option>
                <option value="">已連線</option>
            </select>
        </label>
        <button class="btn bg-blue-600 flex justify-center gap-2 items-center hover:bg-blue-900" @click="search">
            <el-icon :size="15">
                <Search />
            </el-icon>
            <span>搜尋</span>
        </button>
    </form>
    <CircleLoading v-if="isLoading" />
    <Panel v-if="data.length" :header="`${params.dateTime[0]} ~ ${params.dateTime[1]}`">
        <Table :head="head" :data="data" />
    </Panel>
</template>

<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from "vue";
import Table from "./Table.vue";
const app = getCurrentInstance()?.appContext.config.globalProperties
const isLoading = ref(false)
const head = reactive<string[]>(["日期", "事件類型", "ID", "設備位置", "地區"])
let data = reactive([])
const params = reactive({
    dateTime: "",
    type: ""
})
const search = () => {
    isLoading.value = true
    app?.$axios("/query/event", { params }).then(res => {
        console.log(res.data.data)
        data = res.data.data
        isLoading.value = false
    })
}
</script>

<style scoped lang="scss"></style>