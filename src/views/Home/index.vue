<template>
  <div class="wrap">
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
          :class="{ active: place === path.id }"
          @click="selectCity"
        />
      </g>
    </svg>
    <info />
  </div>
</template>
<script lang="tsx" setup>
import paths from './mapPath'
import info from './info.vue'
const place = ref('')
const initViewBox = ref('450 75 180 320')
const nextViewBox = ref('')
const selectCity = (event: MouseEvent) => {
  if (nextViewBox.value) {
    initViewBox.value = nextViewBox.value
  }
  const path = event.currentTarget as SVGPathElement
  const bbox = path.getBBox()
  const padding = 50
  const pathViewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`
  place.value = path.id
  nextViewBox.value = pathViewBox
}
</script>
<style scoped>
.wrap {
    @apply relative w-full h-full overflow-hidden bg-[#a1c5ea];
}

path {
    fill: white;
    stroke: black;
    stroke-width: 0.1;

    &:hover {
        fill: #4169E1;
        cursor: pointer;
    }
}

.active {
    fill: #4169E1;
}
</style>