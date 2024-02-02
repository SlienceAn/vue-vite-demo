<template>
  <div class="card-group">
    <Card v-for="i in countList" :key="i.title" :title="i.title" :message="i.message" :color="i.color">
      <template v-slot:icon>
        <component :is="i.icon" />
      </template>
    </Card>
  </div>
  <div>
    <div class="inner-header flex items-center justify-between">
      <el-checkbox-group>
        <el-checkbox label="連線異常" border />
        <el-checkbox label="已斷線" border />
        <el-checkbox label="已連線" border />
      </el-checkbox-group>
        <el-date-picker class="w-200px" type="daterange" range-separator="-" start-placeholder="Start date" end-placeholder="End date" />
    </div>
    <Table :data="abnormalData" :table-column="tableColumn" />
  </div>
</template>
<script setup lang="ts">
import Card from '../Card.vue';
import Table from '../Table.vue';
const informationStore = useInformation()
const { abnormalData, countList } = storeToRefs(informationStore)
const tableColumn = [
  { label: '設備ID', prop: 'id', width: '100' },
  { label: '縣市', prop: 'city', width: '100' },
  { label: '詳細地址', prop: 'address' },
  { label: '最後更新時間', prop: 'latestUpdate', width: '150' },
]
onMounted(() => {
  informationStore.getAbnormal()
  informationStore.getDisconnect()
  informationStore.getOnline()
})
</script>
<style scoped lang="scss">
.card-group {
  @apply flex gap-2 mb-2 flex-col md: flex-row;
}

.inner-header {
  @apply bg-white py-2 px-4;
}
</style>