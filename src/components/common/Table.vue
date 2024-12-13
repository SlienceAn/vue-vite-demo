<template>
  <div class="h-full bg-white border-gray-300 border-solid border-0.5 rounded-md">
    <el-table
      v-loading="isLoading"
      element-loading-text="讀取中"
      element-loading-background="rgba(250, 250, 250, 0.8)"
      :data="tableData"
      :stripe="true"
      height="90%"
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
    <div class="page">
      <el-pagination
        v-model:current-page="currentPage"
        background
        small
        :pager-count="5"
        :total="total"
        :page-size="pageSize"
        layout="prev, pager, next"
        :hide-on-single-page="false"
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
.page {
  @apply py-4 flex justify-center box-border h-[10%];
}
</style>