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
            <select class="select shadow-0 border-gray-400" v-model="params.status">
                <option value="abnormal">連線異常</option>
                <option value="disconnect">斷線</option>
                <option value="online">已連線</option>
            </select>
        </label>
        <button class="btn bg-blue-600 flex justify-center gap-2 items-center hover:bg-blue-900" @click="search">
            <el-icon :size="15">
                <Search />
            </el-icon>
            <span>搜尋</span>
        </button>
    </form>
    <CircleLoading v-if="isLoading && data.length === 0" />
    <Panel v-if="data.length && !isLoading">
        <Table :head="head" :data="data">
            <template v-if="loginStore.isPremission" #column="{ id, city, address }">
                <td>
                    <el-button type="info" icon="Edit" @click="form.add(id, city, address)" :disabled="false">
                        加入表單
                    </el-button>
                </td>
            </template>
        </Table>
    </Panel>
</template>

<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from "vue";
import Table from "./Table.vue";
import { useForm, useLoginStore } from '../store'
import { ElMessage } from 'element-plus'
const app = getCurrentInstance()?.appContext.config.globalProperties
const isLoading = ref(false)
const head = reactive<string[]>(["設備ID", "設備縣市", "設備地址", "開始日期"])
const form = useForm()
const loginStore = useLoginStore()
let data = reactive([])
const params = reactive({
    dateTime: "",
    status: "online"
})
const search = () => {
    const { dateTime, status } = params
    if (Array.isArray(dateTime)) {
        isLoading.value = true
        app?.$axios("/query", {
            params: {
                type: 'event',
                startTime: dateTime[0],
                endTime: dateTime[1],
                status
            }
        }).then((res: any) => {
            data = res.data.data
            isLoading.value = false
            console.log(data.length)
        })
    } else {
        ElMessage.error("請輸入日期")
    }
}
</script>

<style scoped lang="scss"></style>