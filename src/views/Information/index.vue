<template>
  <div>
    <el-date-picker
      v-model="month"
      type="month"
      placeholder="Pick a month"
      format="YYYY-MM"
      value-format="YYYY-MM"
      class="!w-150px"
      @change="infoStore.getInfo"
    />
  </div>
  <el-scrollbar>
    <div
      v-loading="!options"
      element-loading-text="讀取中..."
      class="container"
    >
      <div
        v-for="i in options"
        :key="i"
        class="chart"
      >
        <Chart :option="i" />
      </div>
    </div>
  </el-scrollbar>
</template>
<script setup lang="tsx">
import Chart from '@/components/common/Echart.vue'
const infoStore = useInformation()
const { month } = storeToRefs(infoStore)
const options = computed(() => {
  // return data.value.map((el) => ({
  //   title: {
  //     text: el.address,
  //     textStyle: {
  //       fontSize: 18,
  //       fontWeight: 'bold'
  //     }
  //   },
  //   tooltip: {
  //     trigger: 'axis',
  //     valueFormatter: function (value) {
  //       return value + ' ' + el.data[0].unit // 暫時用第一個
  //     }
  //   },
  //   legend: {
  //     bottom: 0,
  //     textStyle: {
  //       fontSize: 10
  //     },
  //     itemWidth: 18,
  //     itemHeight: 12,
  //     left: 'center',
  //     orient: 'horizontal',
  //   },
  //   grid: {
  //     bottom: 20
  //   },
  //   xAxis: [
  //     {
  //       type: 'category',
  //       data: el.data[0].value.date,
  //       axisLabel: {
  //         interval: 1,
  //         rotate: 45,
  //         margin: 15,
  //         formatter: function (value) {
  //           return dayjs(value).format('MM-DD')
  //         }
  //       }
  //     }
  //   ],
  //   yAxis: [
  //     {
  //       type: 'value'
  //     }
  //   ],
  //   series: el.data.map(el => ({
  //     name: el.item,
  //     type: 'line',
  //     smooth: false,
  //     symbol: 'none',
  //     data: Object.values(el.value.value),
  //     markLine: {
  //       symbol: ['none', 'none'],
  //       silent: true,
  //       data: [{ type: 'average', name: 'Avg' }],
  //     }
  //   })),
  // }))
  return []
})
onMounted(() => infoStore.getInfo())
</script>
<style scoped lang="scss">
.container {
  @apply flex flex-wrap h-[calc(100vh-64px)];

  .chart {
    @apply h-1/2 w-full md:w-1/2 box-border border border-solid border-gray-2 border-collapse px-4 p-2 bg-[#fff];
  }
}
</style>