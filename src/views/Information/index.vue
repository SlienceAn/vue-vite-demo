<template>
  <el-container class="h-full">
    <el-header class="!h-56px w-full bg-white px-4 border-b-solid border-b-1 box-border border-[#dcdfe6] flex">
      <div class="flex items-center">
        <span class="mr-2">搜尋日期</span>
        <el-date-picker
          v-model="month"
          type="month"
          placeholder="Pick a month"
          format="YYYY-MM"
          value-format="YYYY-MM"
          class="!w-160px"
          @change="getInfoData"
        />
      </div>
      <span class="icons">
        <i-material-symbols-view-agenda
          class="text-2xl"
          :class="grids === 'two' && 'text-blue-5'"
          @click="changeGrids('two')"
        />
        <i-material-symbols-grid-view
          class="text-2xl"
          :class="grids === 'four' && 'text-blue-5'"
          @click="changeGrids('four')"
        />
      </span>
    </el-header>
    <el-main class="!p-0">
      <el-scrollbar>
        <div
          v-loading="!options"
          element-loading-text="讀取中..."
          class="container"
        >
          <div
            v-for="i in options"
            :key="i"
            :class="grids === 'two' ? 'chart' : 'chart-4'"
          >
            <Chart :option="i" />
          </div>
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<script setup lang="tsx">
import Chart from '@/components/common/Echart.vue'
const globalStore = useGlobalStore()
const { city } = storeToRefs(globalStore)
const infoStore = useInformation()
const { month, data, grids } = storeToRefs(infoStore)
const options = computed(() => {
  return data.value.map(item => ({
    title: {
      text: item.address,
    },
    tooltip: {
      show: true,
    },
    legend: {
      show: true,
      left: 'center',
      bottom: 0,
    },
    grid: {
      bottom: 20
    },
    xAxis: [
      {
        type: 'category',
        data: item.data[0].date,
        axisLabel: {
          interval: 0,
          rotate: 30,
          margin: 10,
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: item.data.map(el => ({
      name: el.item,
      type: 'line',
      smooth: false,
      symbol: 'none',
      data: el.value,
      // markLine: {
      //   symbol: ['none', 'none'],
      //   silent: true,
      //   data: [{ type: 'average', name: 'Avg' }],
      // }
    })),
  }))
})
const changeGrids = (val: 'two' | 'four') => {
  infoStore.$patch({ grids: val })
}
const getInfoData = () => {
  infoStore.getInfo()
}
onMounted(() => getInfoData())
watch(city, () => getInfoData())
</script>
<style scoped lang="scss">
:deep(.el-scrollbar__view) {
  @apply h-full;
}

.container {
  @apply flex flex-wrap h-full;

  .chart {
    @apply h-1/2 w-full md:w-full box-border border-1 border-solid border-[#dcdfe6] border-collapse px-4 p-2 bg-white;

    &-4 {
      @apply h-1/2 w-full md:w-1/2 box-border border-1 border-solid border-[#dcdfe6] border-collapse px-4 p-2 bg-white;
    }
  }
}

.icons {
  @apply flex items-center ml-auto text-gray cursor-pointer;
}
</style>