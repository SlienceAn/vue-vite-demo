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
  <div>
    <Table
      ref="table"
      :data="data"
      :table-column="tableColumn"
      :params="{ status }"
      api-url="device"
    />
  </div>
</template>
<script setup lang="ts">
import Card from '../Card.vue'
import Table from '../Table.vue'
const informationStore = useInformation()
const globalStore = useGlobalStore()
const { countList } = storeToRefs(globalStore)
const { data, status } = storeToRefs(informationStore)
const tableColumn = [
  { label: '設備ID', prop: 'id', width: '100', align: 'center' },
  { label: '縣市', prop: 'city', width: '100', align: 'center' },
  { label: '詳細地址', prop: 'address' },
  { label: '最後更新時間', prop: 'latestUpdate', width: '150' },
  { label: '狀態', prop: 'status', width: '100' }
]
const fetchData = (val: string) => {
  informationStore.$patch({ status: val })
}
onMounted(() => globalStore.getDeviceStatusList())
</script>
<style scoped lang="scss">
.card-group {
  @apply flex gap-2 mb-2 flex-col md: flex-row;
}

.inner-header {
  @apply bg-white py-2 px-4;
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