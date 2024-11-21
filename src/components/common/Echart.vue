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
let isActivat = ref(false)
echarts.registerTheme('T', T)
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
const draw = () => {
  chart.value = markRaw(echarts.init(echart.value, 'T'))
  chart.value?.setOption(props.option)
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
</script>