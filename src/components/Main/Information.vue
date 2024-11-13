<template>
  <div class="card-group">
    <Card
      v-for="i in countList"
      :key="i.title"
      :title="i.title"
      :message="i.message"
      :color="i.color"
      :class="{ selected: i.type === status }"
      @click="fetchData(i.type)"
    >
      <template #icon>
        <component :is="i.icon" />
      </template>
    </Card>
  </div>
  <div class="p-2">
    <Table
      :table-column="tableColumn"
      :params="{ status, city }"
      api-url="device"
      :total="currentDataTotal"
    />
  </div>
</template>
<script setup lang="tsx">
import Card from '../Card.vue'
import Table from '../common/Table.vue'
import tableFormatter from '../../untils/tableFormatter'
const informationStore = useInformation()
const globalStore = useGlobalStore()
const { countList, city } = storeToRefs(globalStore)
const { status } = storeToRefs(informationStore)
const { statusIcon, accumulation } = tableFormatter()
const tableColumn = [
  { label: '設備ID', prop: 'id', width: '100', align: 'center' },
  { label: '詳細地址', prop: 'address' },
  { label: '最後更新時間', prop: 'latestUpdate', width: '150' },
  { label: '累積天數', prop: 'accumulation', width: '90', align: 'center', formatter: accumulation },
  { label: '狀態', prop: 'status', width: '90', align: 'center', formatter: statusIcon }
]
const currentDataTotal = computed(() => countList.value.find(el => el.type === status.value)?.message)
onMounted(() => globalStore.getDeviceStatusList())
const fetchData = (val: string) => informationStore.$patch({ status: val })
</script>
<style scoped lang="scss">
.card-group {
  @apply flex gap-2 flex-col px-2 pt-2 md: flex-row;
}

.selected {
  @apply relative bg-[#ECF5FF] text-[#409EFF] border border-blue-400;

  &:after {
    @apply absolute w-0 h-0 left-1/2 border-l-[10px] border-l-transparent border-t-[15px] border-t-blue-400 border-r-[10px] border-r-transparent;
    content: "";
    z-index: 5;
  }
}
</style>