<template>
  <div class="card-group">
    <Card v-for="i in countList" :key="i.title" :title="i.title" :message="i.message" :color="i.color">
      <template v-slot:icon>
        <component :is="i.icon" />
      </template>
    </Card>
  </div>
  <div class="flex flex-col gap-2">
    <Table :data="abnormalData" :table-column="tableColumn" />
    <Table :data="disconnectData" :table-column="tableColumn" />
  </div>
</template>
<script setup lang="ts">
import Card from "../Card.vue";
import Table from "../Table.vue";
const informationStore = useInformation()
const { abnormalData, disconnectData, countList } = storeToRefs(informationStore)
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
</style>