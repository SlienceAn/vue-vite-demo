<template>
    <div class="bg-white border border-gray-200 rounded-md">
        <el-table :data="attrs.data" height="300" stripe border highlight-current-row>
            <el-table-column type="index" :index="1" label="#" width="50" align="center" />
            <el-table-column v-for="col in tableColumn" :key="col.prop" :prop="col.prop" :label="col.label"
                :width="col.width" />
            <template #empty>
                <el-empty description="無資料" :image-size="100" />
            </template>
        </el-table>
        <div class="py-4 flex justify-center items-center border border-t-gray-100">
            <el-pagination background small layout="prev, pager, next" :total="100" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    tableColumn: Array<any>
}>()
const attrs: any = useAttrs()
</script>

<style scoped lang="scss">
table {
    @apply w-full text-sm text-left text-dark-500;

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
:deep(.el-table thead){
    @apply text-black text-16px bg-dark-700;
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