<template>
  <svg
    ref="svg"
    xmlns="http://www.w3.org/2000/svg"
    version="1.2"
    baseProfile="tiny"
    width="100vw"
    height="100vh"
    :viewBox="initViewBox"
    preserveAspectRatio="xMidYMid meet"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <animate
      ref="animate"
      attributeName="viewBox"
      :from="initViewBox"
      :to="nextViewBox"
      dur="0.3s"
      begin="click"
      fill="freeze"
    />
    <g id="COUNTY_MOI_1130718">
      <path
        v-for="path in paths"
        :id="path.id"
        :key="path.id"
        :d="path.d"
        :fill-rule="path.fillRule"
        :class="getPathStyle(path.id)"
        pointer-events="all"
        @click="selectCity"
      />
    </g>
  </svg>
</template>
<script lang="ts" setup>
import paths from './mapPath'
const place = ref('')
const initViewBox = ref('450 80 180 340')
const nextViewBox = ref('')

// 更改 path class
const getPathStyle = computed(() => (pathId: string) => ({
  path: true, // 初始狀態
  active: place.value === pathId, // 選中狀態
  inactive: place.value && place.value !== pathId // 未選中狀態
}))

// 選擇縣市 path
const selectCity = (event: MouseEvent) => {
  nextViewBox.value && (initViewBox.value = nextViewBox.value)
  const path = event.currentTarget as SVGPathElement
  const bbox = path.getBBox()
  const padding = 20
  const pathViewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`
  place.value = path.id
  nextViewBox.value = pathViewBox
}
</script>
<style scoped>
.path {
  stroke-width: 0.1;
  @apply fill-white stroke-black transition-all duration-300 ease-in-out;

  &:hover {
    @apply fill-[#4169E1] cursor-pointer;
  }

  &.active {
    @apply fill-[#4169E1] stroke-opacity-1 stroke-white;
  }

  &.inactive {
    @apply fill-none stroke-op-[0.3];
  }
}
</style>