<template>
  <el-container class="h-full">
    <el-header>
      <el-select
        multiple
        clearable
        class="!w-150px"
      >
        <el-option value="cccc" />
      </el-select>
      <el-select
        multiple
        clearable
        class="!w-150px"
      >
        <el-option value="cccc" />
      </el-select>
      <el-button type="primary">
        搜尋
      </el-button>
    </el-header>
    <el-main class="!pt-0">
      <Table
        :table-column="tableColumn"
        :params="{ status }"
        api-url="device"
        :total="currentDataTotal"
      />
    </el-main>
  </el-container>
</template>
<script setup lang="tsx">
import Table from '@/components/common/Table.vue'
import tableFormatter from '@/untils/tableFormatter'
const informationStore = useInformation()
const { status } = storeToRefs(informationStore)
const { statusIcon, accumulation } = tableFormatter()
const tableColumn = [
  { label: '設備ID', prop: 'id', width: '100', align: 'center' },
  { label: '詳細地址', prop: 'address' },
  { label: '最後更新時間', prop: 'latestUpdate', width: '150' },
  { label: '累積天數', prop: 'accumulation', width: '90', align: 'center', formatter: accumulation },
  { label: '狀態', prop: 'status', width: '90', align: 'center', formatter: statusIcon }
]
// const currentDataTotal = computed(() => countList.value.find(el => el.type === status.value)?.message)
const currentDataTotal = 80
</script>
<style scoped lang="scss">
:deep(.el-header){
  @apply flex px-4 items-center gap-4;
}
</style>