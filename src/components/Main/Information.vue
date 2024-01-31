<template>
  <div class="card-group">
    <Card v-for="i in countList" :key="i.title" :title="i.title" :message="i.message" :color="i.color">
      <template v-slot:icon>
        <component :is="i.icon" />
      </template>
    </Card>
  </div>
  <div class="panel-group">
    <Panel v-if="abnormalData.length !== 0" header="連線異常">
      <Table :head="tableHead" :data="abnormalData" />
    </Panel>
    <Panel v-if="disconnectData.length !== 0" header="已斷線">
      <Table :head="tableHead" :data="disconnectData" />
    </Panel>
  </div>
</template>
<script setup lang="ts">
import Card from "../Card.vue";
import Panel from "../Panel.vue";
import Table from "../Table.vue";
const informationStore = useInformation()
const { abnormalData, disconnectData, countList } = storeToRefs(informationStore)
const tableHead = reactive<string[]>(['設備ID', '設備縣市', '設備地址', '開始日期', '累積(天)'])
onMounted(() => {
  informationStore.getAbnormal()
  informationStore.getDisconnect()
  informationStore.getOnline()
})
</script>
<style scoped lang="scss">
.card-group {
  @apply flex gap-4 mb-4 flex-col md: flex-row;
}

.panel-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>