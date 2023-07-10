<template>
    <form class="flex gap-2 items-end mb-4">
        <label>
            <h4 class="title-label">選擇日期</h4>
            <div>
                <el-date-picker id="w" v-model="select_date" type="daterange" value-format="YYYY-MM-DD" range-separator="~"
                    start-placeholder="起始日期" end-placeholder="結束日期" />
            </div>
        </label>
        <label>
            <h4 class="title-label">事件類型</h4>
            <select class="select shadow-0 border-gray-400">
                <option value="empty">連線異常</option>
                <option value="error">斷線</option>
                <option value="error">未連線</option>
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
    <Panel v-if="data.length" :header="`${select_date[0]} ~ ${select_date[1]}`">
        <Table :head="head" :data="data" />
    </Panel>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Table from "./Table.vue";
import { fakerZH_TW as faker } from '@faker-js/faker'

const isLoading = ref(false)
const select_date = ref<any>("")
const head = reactive<string[]>(["日期", "事件類型", "ID", "設備位置", "地區"])
const data = reactive<any[]>([])
const search = () => {
    isLoading.value = true;
    setTimeout(() => {
        for (let i = 0; i < 116; i++) {
            data.push({
                a: faker.database.column(),
                b: faker.date.birthdate(),
                c: faker.company.buzzVerb(),
                d: faker.color.hwb(),
                e: faker.airline.aircraftType()
            })
        }
        isLoading.value = false;
    }, 3000)
}
</script>

<style scoped lang="scss">

</style>