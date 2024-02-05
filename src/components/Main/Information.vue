<template>
  <div class="card-group">
    <Card v-for="i in countList" :key="i.title" :title="i.title" :message="i.message" :color="i.color"
      @click="fetchData(i.type)">
      <template v-slot:icon>
        <component :is="i.icon" />
      </template>
    </Card>
  </div>
  <div>
    <Table :data="data" :table-column="tableColumn" />
  </div>
</template>
<script setup lang="ts">
import Card from '../Card.vue';
import Table from '../Table.vue';
const informationStore = useInformation()
const { data, countList, status } = storeToRefs(informationStore)
const tableColumn = [
  { label: '設備ID', prop: 'id', width: '100', align: 'center' },
  { label: '縣市', prop: 'city', width: '100', align: 'center' },
  { label: '詳細地址', prop: 'address' },
  { label: '最後更新時間', prop: 'latestUpdate', width: '150' },
]
onMounted(() => {
  informationStore.getAll()
})
const fetchData = (val: string) => {
  informationStore.$patch({ status: val })
  informationStore[`get${status.value}`]()
}
</script>
<style scoped lang="scss">
.card-group {
  @apply flex gap-2 mb-2 flex-col md: flex-row;
}

.inner-header {
  @apply bg-white py-2 px-4;
}
</style>