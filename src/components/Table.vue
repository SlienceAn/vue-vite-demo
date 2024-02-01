<template>
    <el-table :data="attrs.data" height="300" class="border border-gray-400 rounded-md" stripe border>
        <el-table-column type="index" :index="1" label="#" width="50" align="center" />
        <el-table-column prop="id" label="設備ID" width="100" />
        <el-table-column prop="city" label="縣市" width="100" />
        <el-table-column prop="address" label="詳細地址" />
        <el-table-column prop="latestUpdate" label="最後更新時間" width="150" />
    </el-table>
</template>

<script setup lang="ts">
const props = defineProps<{
    tableColumn: Array<any>
}>()
const attrs = useAttrs()
console.log('attrs', attrs)
console.log('props', props)
// //頁數
// const page = ref<number>(1)
// //每頁顯示的數量，預設5筆
// const showCount = ref<number>(10)
// //顯示資料
// const showData = computed<any[]>(() => props.data.slice(showCount.value * (page.value - 1), showCount.value + showCount.value * (page.value - 1)))
// //頁碼總數
// const pageCount = computed<number>(() => Math.ceil(props.data.length / showCount.value))
// //選擇頁數
// const currentPage = (p: number) => {
//     page.value = p;
// }

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