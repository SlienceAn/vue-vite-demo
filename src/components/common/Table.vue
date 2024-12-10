<template>
  <div class="h-full bg-white">
    <el-table
      v-loading="isLoading"
      element-loading-text="讀取中"
      element-loading-background="rgba(250, 250, 250, 0.8)"
      :data="tableData"
      stripe
      height="85%"
      border
      highlight-current-row
    >
      <el-table-column
        v-if="indexColumn"
        type="index"
        :index="indexCount"
        label="#"
        width="50"
        align="center"
      />
      <el-table-column
        v-for="{ prop, label, width, align, formatter } in tableColumn"
        :key="prop"
        :prop="prop"
        :label="label"
        :width="width"
        :align="align"
        :formatter="formatter"
      />
      <template #empty>
        <el-empty
          description="無資料"
          :image-size="100"
        />
      </template>
    </el-table>
    <div class="py-4 flex justify-center items-center box-border border-t border-t-gray-100 h-[15%]">
      <el-pagination
        v-model:current-page="currentPage"
        background
        small
        :pager-count="5"
        :total="total"
        :page-size="pageSize"
        layout="prev, pager, next"
        hide-on-single-page
        @current-change="getApiData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tableColumn: Array<any>,
  indexColumn?: boolean
}>()
const attrs: any = useAttrs()
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const isLoading = ref(false)
const { proxy }: any = getCurrentInstance()
const data = ref<any[]>([])
const tableData = computed(() => {
  if (attrs['data']) {
    return Object.entries(attrs.data).map(([, value]) => value)
  }
  return data.value
})
// 獲取API數據
const getApiData = async () => {
  isLoading.value = true
  // 獲取頁面與父層參數
  const params = {
    ...attrs['params'],
    page: currentPage.value,
    size: pageSize.value
  }
  const url = `/${attrs['api-url']}?${new URLSearchParams(params)}`
  const request = await proxy.$http.get(url)
  isLoading.value = false
  data.value = [...request.data]
  total.value = request.total
}
// 索引開始值
const indexCount = (index: number) => {
  return index + 1 + (currentPage.value * 20 - 20)
}
onMounted(() => {
  attrs['api-url'] && getApiData()
})
watch(
  () => attrs['params'],
  () => { getApiData() },
)
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