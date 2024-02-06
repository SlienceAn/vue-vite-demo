<template>
  <div class="bg-white rounded-md">
    <el-table
      :data="attrs.data"
      height="300"
      stripe
      border
      highlight-current-row
    >
      <el-table-column
        type="index"
        :index="1"
        label="#"
        width="50"
        align="center"
      />
      <el-table-column
        v-for="col in tableColumn"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :align="col.align"
      />
      <template #empty>
        <el-empty
          description="無資料"
          :image-size="100"
        />
      </template>
    </el-table>
    <div class="py-4 flex justify-center items-center border border-t-gray-100">
      <el-pagination
        v-model:current-page="currentPage"
        background
        small
        :pager-count="5"
        :page-size="10"
        layout="prev, pager, next"
        hide-on-single-page
        :total="attrs.data.length"
        @current-change="getApiData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
    tableColumn: Array<any>
}>()
const attrs: any = useAttrs()
const currentPage = ref(1)
const getApiData = async () => {
  console.log('current-page',currentPage.value)
}
getApiData()
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

.el-table {
    --el-table-bg-color: transparent;
    --el-table-header-bg-color: #F5F9FF;
    --el-bg-color: transparent;
}

:deep(.el-table thead) {
    @apply text-15px;
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