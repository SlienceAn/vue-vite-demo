<template>
    <div class="flex items-center justify-end gap-2 px-2 py-1">
        <span>每頁顯示</span>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500"
            v-model="showCount">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="15">15</option>
        </select>
        <span>筆</span>
    </div>
    <table>
        <thead>
            <tr>
                <th v-for="i in head" :key="i" scope="col">{{ i }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="i in showData" :key="i">
                <td v-for="g in i" :key="g">{{ g }}</td>
            </tr>
        </tbody>
    </table>
    <div class="page-group flex gap-1 px-5 py-2 hover:cursor-pointer">
        <span v-if="page > 1" class="flex items-center" @click="page--">
            <el-icon :size="20">
                <CaretLeft />
            </el-icon>
        </span>
        <span class="page" v-for="i in pageCount" :key="i" @click="currentPage(i)">{{ i }}</span>
        <span class="flex items-center" @click="page++">
            <el-icon :size="20">
                <CaretRight />
            </el-icon>
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
const props = defineProps<{ head: string[], data: any[] }>()
//頁數
const page = ref<number>(1)
//每頁顯示的數量
const showCount = ref<number>(5)
//顯示資料
const showData = computed(() => props.data.slice(page.value, showCount.value))
//頁碼總數
const pageCount = computed(() => Math.ceil(props.data.length / showCount.value))
const currentPage = (p: number) => {
    //     page.value = p;
}

</script>

<style scoped lang="scss">
table {
    @apply w-full text-sm text-left text-gray-500;

    thead {
        @apply text-xs text-gray-700 bg-gray-50;

        tr th {
            @apply px-6 py-3 text-lg;
        }
    }

    tbody {
        tr {
            @apply border-b bg-gray-50;

            th {
                @apply px-6 py-4 font-medium text-gray-900 whitespace-nowrap;
            }

            td {
                @apply px-6 py-4;
            }
        }
    }
}

.page {
    @apply border border-gray-400 rounded-md px-3 py-1 hover: cursor-pointer hover:bg-dark-300 hover:text-white hover:font-bold;
}
</style>