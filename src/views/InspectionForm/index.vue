<template>
  <el-container class="h-full">
    <el-header>
      <el-select
        v-model="id"
        clearable
        class="!w-200px mr-2"
        placeholder="請選擇設備"
      >
        <el-option
          v-for="i in cityAddressList"
          :key="i"
          :label="i.address"
          :value="i.id"
        />
      </el-select>
      <el-button type="primary">
        搜尋
      </el-button>
    </el-header>
    <el-main class="!p-4">
      <Table
        :table-column="tableColumn"
        :params="{ city, id }"
        api-url="device"
        :total="currentDataTotal"
        index-column
      />
    </el-main>
  </el-container>
</template>
<script setup lang="tsx">
import Table from '@/components/common/Table.vue'
import tableFormatter from '@/untils/tableFormatter'
const { addUnit } = tableFormatter()
const gloalStore = useGlobalStore()
const { city, cityAddressList, id } = storeToRefs(gloalStore)
const tableColumn = [
  { label: '日期', prop: 'date', align: 'center' },
  { label: '溫度', prop: 'TMP', align: 'center', width: 80, formatter: addUnit },
  { label: '濕度', prop: 'HUM', align: 'center', width: 80, formatter: addUnit },
  { label: '風速', prop: 'WS', align: 'center', width: 100, formatter: addUnit },
  { label: '雨量', prop: 'RAIN', align: 'center', width: 100, formatter: addUnit },
  { label: 'CO2', prop: 'CO2', align: 'center', width: 100, formatter: addUnit },
  { label: 'CO', prop: 'CO', align: 'center', width: 100, formatter: addUnit },
  { label: 'PM2.5', prop: 'PM25', align: 'center', width: 100, formatter: addUnit },
  { label: 'PM10', prop: 'PM10', align: 'center', width: 100, formatter: addUnit },
  { label: 'O3', prop: 'O3', align: 'center', width: 100, formatter: addUnit },
]
const currentDataTotal = 76
</script>
<style scoped lang="scss">
:deep(.el-header) {
  @apply h-56px w-full px-4 border-b-solid border-b-1 box-border border-[#dcdfe6] flex items-center;
}
</style>