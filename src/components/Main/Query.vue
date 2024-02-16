<template>
  <div class="px-2 pt-2">
    <el-select
      v-model="statusValue"
      multiple
      placeholder="選擇狀態"
    >
      <el-option
        label="已連線"
        value="online"
      />
      <el-option
        label="連線異常"
        value="abnormal"
      />
      <el-option
        label="已斷線"
        value="disconnect"
      />
    </el-select>
  </div>
  <div class="p-2">
    <Table
      :table-column="tableColumn"
      api-url="query"
      :params="{ city, status: statusValue }"
    />
  </div>
</template>
<script setup lang="ts">
import Table from '../Table.vue'
const globalStore = useGlobalStore()
const { city } = storeToRefs(globalStore)
const statusValue = ref('')
const tableColumn = [
  { label: '設備ID', prop: 'id', width: '100', align: 'center' },
  { label: '詳細地址', prop: 'address' },
  { label: '最後更新時間', prop: 'latestUpdate', width: '150' },
  { label: '累積天數', prop: 'latestUpdate', width: '90', align: 'center' },
  { label: '狀態', prop: 'status', width: '90', align: 'center' }
]
</script>
<style scoped lang="scss">
$triangle-width: 13px;

.switch {
  position: relative;
  @apply inline-block px-4 py-2 bg-blue-600 text-white font-bold border-r;

  &:hover {
    @apply cursor-pointer bg-blue-800;
  }

  &:first-child {
    @apply rounded-tl-lg rounded-bl-lg;
  }

  &:last-child {
    @apply rounded-tr-lg rounded-br-lg border-0;
  }

  &-active {
    @apply bg-blue-900;

    &::before {
      content: "";
      position: absolute;
      bottom: -($triangle-width*1.75);
      left: calc(50% - $triangle-width);
      border-style: solid;
      border-width: $triangle-width*1.75 $triangle-width 0 $triangle-width;
      @apply w-0 h-0 border-l-transparent border-t-blue-900 border-r-transparent;
    }
  }
}
</style>