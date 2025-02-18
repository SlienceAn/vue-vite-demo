<template>
  <el-container class="h-full">
    <el-header class="!h-56px w-full px-4 flex">
      <div class="flex items-center">
        <span class="mr-2">搜尋日期</span>
        <el-date-picker
          v-model="month"
          type="date"
          placeholder="Pick a month"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          class="!w-160px"
          @change="getInfoData"
        />
      </div>
      <span class="icons">
        <i-material-symbols-grid-view
          class="text-2xl"
          :class="grids === 'two' && 'text-blue-5'"
          @click="changeGrids('two')"
        />
        <i-material-symbols-grid-on
          class="text-2xl"
          :class="grids === 'four' && 'text-blue-5'"
          @click="changeGrids('four')"
        />
      </span>
    </el-header>
    <el-main class="!p-0">
      <chartScrollbar>
        <div
          v-loading="!options"
          element-loading-text="讀取中..."
          class="container"
        >
          <div
            v-for="i in options"
            :key="i"
            :class="grids === 'two' ? 'chart' : 'chart-3'"
          >
            <EChart :option="pieOption" />
          </div>
        </div>
      </chartScrollbar>
    </el-main>
  </el-container>
</template>
<script setup lang="tsx">
import EChart from '@/components/common/Echart.vue'
import chartScrollbar from './chartScrollbar.vue'
import { dayjs } from 'element-plus'
const globalStore = useGlobalStore()
const { city } = storeToRefs(globalStore)
const infoStore = useInformation()
const { month, data, grids } = storeToRefs(infoStore)
const getInfoData = () => {
  infoStore.getInfo()
}

// 圓餅圖(測試)
const pieOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    show:false
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['30%','70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
      ]
    }
  ]
}
const baseChartConfig = {
  tooltip: {
    show: true
  },
  legend: {
    show: true,
    left: 'center',
    bottom: 0
  },
  grid: {
    bottom: 20
  }
}
const createSeriesConfig = (el) => ({
  name: el.item,
  type: 'line',
  smooth: false,
  symbol: 'none',
  data: el.value
})
const createXAxisConfig = (dates) => ({
  type: 'category',
  data: dates,
  axisLabel: {
    interval: 0,
    rotate: 15,
    margin: 10,
    formatter: val => dayjs(val).format('MM-DD')
  }
})
const options = computed(() => {
  return data.value.map(item => ({
    ...baseChartConfig,
    title: {
      text: item.address,
    },
    xAxis: [createXAxisConfig(item.data[0].date)],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: item.data.map(createSeriesConfig),
  }))
})
const changeGrids = (val: 'two' | 'four') => {
  infoStore.$patch({ grids: val })
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
    @apply h-1/2 w-full md:w-1/2 box-border border-1 border-solid border-[var(--el-border-color)] border-collapse;

    &-3 {
      @apply h-1/2 w-full md:w-1/3 box-border border-1 border-solid border-[var(--el-border-color)] border-collapse;
    }
  }
}

.icons {
  @apply flex items-center ml-auto text-gray cursor-pointer;
}
</style>