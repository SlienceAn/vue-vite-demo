<template>
  <el-container>
    <el-header class="flex items-center">
      <el-date-picker v-model="date" />
      <div class="unit-box" />
    </el-header>
    <el-main>
      <el-card
        v-for="opt in optionList"
        :key="opt.title.text"
        class="chart"
      >
        <template #header>
          unit
        </template>
        <Echart :option="opt" />
      </el-card>
    </el-main>
  </el-container>
</template>
<script lang="tsx" setup>
import Echart from '../Echart.vue'
const date = ref(new Date())
const option = {
  title: {
    text: '銷售數據'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['銷售額', '利潤']
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '銷售額',
      type: 'line',
      data: [5000, 6200, 7800, 8500, 9200, 10500]
    },
    {
      name: '利潤',
      type: 'line',
      data: [2500, 3200, 3800, 4200, 4800, 5500]
    }
  ]
}
const optionList = [option, option, option]
</script>
<style lang="scss" scoped>
.chart {
  @apply w-full sm:w-1/2;
}
</style>