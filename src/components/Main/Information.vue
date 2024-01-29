<template>
  <CircleLoading v-if="isLoading" />
  <div v-else class="card-group">
    <Card v-for="i in cardInfomation" :key="i" :title="i.title" :message="i.message" :color="i.color">
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
import { onMounted, reactive, ref, getCurrentInstance } from "vue";
import { useRound } from '@vueuse/math'
const app = getCurrentInstance()?.appContext.config.globalProperties;
let abnormalData = reactive<any[]>([])//連線異常
let disconnectData = reactive<any[]>([])//斷線資訊
let cardInfomation = reactive<any[]>([{
  title: "總機台數量",
  type: "Total",
  message: "",
  icon: "InfoFilled",
  color: "blue",
},
{
  title: "已連線",
  type: "online",
  message: "",
  icon: "SuccessFilled",
  color: "green",
},
{
  title: "連線異常",
  type: "abnormal",
  message: "",
  icon: "WarningFilled",
  color: "orange",
},
{
  title: "已斷線",
  type: "disconnect",
  message: "",
  icon: "CircleCloseFilled",
  color: "red",
},])//卡面資訊
const isLoading = ref(true)
const tableHead = reactive<string[]>(['設備ID', '設備縣市', '設備地址', '開始日期', '累積(天)'])
onMounted(() => {
  fetchData()
})
const fetchData = () => {
  //js try catch 捕捉API錯誤----fix
  const online = app?.$axios('/device/online')
  const disconnect = app?.$axios("/device/disconnect")
  const abnormal = app?.$axios("/device/abnormalssss")
  Promise.all([disconnect, abnormal, online]).then((res: any[]) => {
    const { data: disData } = res[0]['data']
    const { data: abData } = res[1]['data']
    const { data: onData } = res[2]['data']
    //計算累績天數
    disData.forEach((el: any, idx: number, arr: any[]) => {
      const dayDiff = new Date().getTime() - new Date(el['latestUpdate']).getTime()
      arr[idx]['total'] = useRound(dayDiff / 1000 / 60 / 60 / 24)
    })
    abData.forEach((el: any, idx: number, arr: any[]) => {
      const dayDiff = new Date().getTime() - new Date(el['latestUpdate']).getTime()
      arr[idx]['total'] = useRound(dayDiff / 1000 / 60 / 60 / 24)
    })
    cardInfomation[0]['message'] = onData.length + abData.length + disData.length
    cardInfomation[1]['message'] = onData.length
    cardInfomation[2]['message'] = abData.length
    cardInfomation[3]['message'] = disData.length
    disconnectData = [...disData]
    abnormalData = [...abData]
    isLoading.value = false
  })
}
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