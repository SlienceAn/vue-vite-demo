<template>
  <div
    ref="echart"
    :style="{ height, width }"
  />
</template>
<script setup lang="ts">
import *as echarts from 'echarts'
const props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  },
  height: {
    type: String,
    default: '100%'
  },
  width: {
    type: String,
    default: '100%'
  }
})
const echart = ref(null)
// const option = {
//   title: {
//     text: '銷售數據'
//   },
//   tooltip: {
//     trigger: 'axis'
//   },
//   legend: {
//     data: ['銷售額', '利潤']
//   },
//   xAxis: {
//     type: 'category',
//     data: ['1月', '2月', '3月', '4月', '5月', '6月']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       name: '銷售額',
//       type: 'line',
//       data: [5000, 6200, 7800, 8500, 9200, 10500]
//     },
//     {
//       name: '利潤',
//       type: 'line',
//       data: [2500, 3200, 3800, 4200, 4800, 5500]
//     }
//   ]
// }
onMounted(() => echarts.init(echart.value).setOption(props.option))
</script>
<style scoped lang="scss"></style>