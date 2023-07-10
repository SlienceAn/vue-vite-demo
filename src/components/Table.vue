<template>
    <div class="flex items-center justify-end gap-2 px-2 py-1">
        <span>每頁顯示</span>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500"
            v-model="showCount">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="30">30</option>
        </select>
        <span>筆</span>
    </div>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th v-for="i in head" :key="i" scope="col">{{ i }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(i, idx) in showData" :key="i">
                <td class="font-bold">{{ (idx + 1) + ((page - 1) * showCount) }}</td>
                <td v-for="g in i" :key="g">{{ g }}</td>
            </tr>
        </tbody>
    </table>
    <div class="page-group flex gap-1 px-3 py-2 hover:cursor-pointer">
        <button class="page-btn" @click="page--" :disabled="page === 1">
            <el-icon :size="20">
                <CaretLeft />
            </el-icon>
        </button>
        <span :class="`page ${page === i ? 'page-active' : ''}`" v-for="i in pageCount" :key="i" @click="currentPage(i)">{{
            i }}</span>
        <button class="page-btn" @click="page++" :disabled="page === pageCount">
            <el-icon :size="20">
                <CaretRight />
            </el-icon>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
const props = defineProps<{ head: string[], data: any[] }>()

//頁數
const page = ref<number>(1)
//每頁顯示的數量，預設10筆
const showCount = ref<number>(10)
//顯示資料(少一筆...Bug)
const showData = computed<any[]>(() => props.data.slice(showCount.value * (page.value - 1), showCount.value + showCount.value * (page.value - 1)))
//頁碼總數
const pageCount = computed<number>(() => Math.ceil(props.data.length / showCount.value))
//選擇頁數
const currentPage = (p: number) => {
    page.value = p;
}

</script>

<style scoped lang="scss">
table {
    @apply w-full text-sm text-left text-gray-500;

    thead {

        @apply text-xs text-gray-700 border-t border-gray-300;

        tr th {
            @apply px-3 py-2 text-lg;
        }
    }

    tbody {
        tr {
            @apply border-t bg-gray-50 border-gray-300;

            th {
                @apply px-6 py-4 font-medium text-gray-900 whitespace-nowrap;
            }

            td {
                @apply px-3 py-2;
            }
        }
    }
}

.page {
    @apply border border-gray-400 rounded-md px-3 py-1;

    &:hover,
    &-btn:hover {
        @apply cursor-pointer bg-dark-300 text-white font-bold;
    }

    &-active {
        @apply bg-dark-300 text-white font-bold;
    }

    &-btn {
        @apply flex items-center border border-gray-400 rounded-md px-2;

        &:disabled {
            @apply border-gray-300 text-gray-300;
        }
    }
}
</style>