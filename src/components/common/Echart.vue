<template>
  <div
    ref="echart"
    :style="{ height, width }"
  />
</template>
<script setup lang="ts">
import *as echarts from 'echarts'
import type { ECharts } from 'echarts'
import T from './chartTheme'
const echart = ref()
const chart = ref<ECharts | null>(null)
const infoStore = useInformation()
const { grids } = storeToRefs(infoStore)
let isActivat = ref(false)
echarts.registerTheme('T', T)
const props = defineProps({
  option: {
    type: Object,
    default: () => ({
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
    })
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
const { option } = toRefs(props)
const draw = () => {
  chart.value = markRaw(echarts.init(echart.value, 'T'))
  chart.value?.setOption(option.value)
  addEventListener()
}
const dispose = () => {
  removeEventListener()
  chart.value?.dispose()
}
const resize = () => {
  if (chart.value) {
    dispose()
    setTimeout(() => draw(), 100)
  }
}
const addEventListener = () => {
  chart.value && window.addEventListener('resize', resize)
}
const removeEventListener = () => {
  chart.value && window.removeEventListener('resize', resize)
}

// keep-alive激活時的處理
onActivated(() => {
  if (!isActivat.value) {
    nextTick(() => {
      chart.value?.resize()
    })
  }
})
onDeactivated(() => {
  isActivat.value = false
})
onBeforeMount(() => {
  removeEventListener()
})
onMounted(() => {
  nextTick(() => {
    draw()
  })
})
watch(grids, () => {
  nextTick(() => {
    chart.value?.resize()
  })
})
// 提供開發人員一個方法，來對 DOM tree 的變動來作反應，這被設計用來替換在 DOM3 事件規範中的 Mutation Events
// const observer = new MutationObserver((mutations) => {
//   console.log(mutations)
// })
</script>