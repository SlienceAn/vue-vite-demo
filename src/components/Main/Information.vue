<template>
  <CircleLoading v-if="isLoading" />
  <div v-else class="card-group">
    <Card v-for="i in cardInfomation" :key="i" :title="i.title" :message="i.message" :color="i.color">
      <template v-slot:icon>
        <component :is="i.icon" />
      </template>
      <template v-slot:map>
        <div class="w-full h-[900px] md:h-[400px] lg:h-[700px]">
          <LMap ref="map" :zoom="15" :center="[22.63151, 120.30132]">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
            <LMarker :lat-lng="[22.63151, 120.30132]"></LMarker>
            <LMarker :lat-lng="[22.63151, 120.32344]"></LMarker>
            <LMarker :lat-lng="[22.63151, 120.30788]"></LMarker>
          </LMap>
        </div>
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
import Card from "@components/Card.vue";
import Panel from "@components/Panel.vue";
import Table from "@components/Table.vue";
import { onMounted, reactive, ref } from "vue";
import axios from 'axios'

let abnormalData = reactive<any[]>([])//連線異常
let disconnectData = reactive<any[]>([])//斷線資訊
let cardInfomation = reactive<any[]>([{
  title: "總機台數量",
  type: "Total",
  message: "123",
  icon: "InfoFilled",
  color: "blue",
},
{
  title: "已連線",
  type: "online",
  message: "92",
  icon: "SuccessFilled",
  color: "green",
},
{
  title: "連線異常",
  type: "abnormal",
  message: "20",
  icon: "WarningFilled",
  color: "orange",
},
{
  title: "已斷線",
  type: "disconnect",
  message: "11",
  icon: "CircleCloseFilled",
  color: "red",
},])//卡面資訊
const isLoading = ref(true)
const tableHead = reactive<string[]>(['設備IP', '設備類型', '設備位置', '開始日期', '累積(分)'])

onMounted(() => {
  //延遲預覽
  setTimeout(() => {
    const disconnect = axios.get("/device/disconnect")
    const abnormal = axios.get("/device/abnormal")
    Promise.all([disconnect, abnormal]).then((res: any[]) => {
      const { data: disData } = res[0]['data']
      const { data: abData } = res[1]['data']
      cardInfomation[2]['message'] = abData.length
      cardInfomation[3]['message'] = disData.length
      disconnectData = [...disData]
      abnormalData = [...abData]
      isLoading.value = false
    })
  }, 2000)
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