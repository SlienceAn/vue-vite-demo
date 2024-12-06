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
      <!-- <el-select
        multiple
        clearable
        class="!w-150px"
      >
        <el-option value="cccc" />
      </el-select> -->
      <el-button type="primary">
        搜尋
      </el-button>
    </el-header>
    <el-main class="!pt-0">
      <Table
        :table-column="tableColumn"
        :params="{ city }"
        api-url="device"
        :total="currentDataTotal"
        :index-column="false"
      />
    </el-main>
  </el-container>
</template>
<script setup lang="tsx">
import Table from '@/components/common/Table.vue'
const { city } = useGlobalStore()

const tableColumn = [
  { label: '日期', prop: 'date' },
  { label: 'TMP', prop: 'tmpValue' },
  { label: 'HUM', prop: 'humValue' },
]
const currentDataTotal = 80
</script>
<style scoped lang="scss">
:deep(.el-header) {
  @apply flex px-4 items-center gap-4;
}
</style>