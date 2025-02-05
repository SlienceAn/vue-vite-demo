<template>
  <swiper-container
    class="w-full py-4"
    :slides-per-view="slideView"
    speed="500"
    loop="true"
  >
    <swiper-slide
      v-for="i in 10"
      :key="i"
      class="swiper-slide"
    >
      <div shadow="always">
        <span>2024-12-02</span>
        <div class="flex items-center gap-2">
          <i-material-symbols-partly-cloudy-day class="text-[1.5rem]" />
          <span class="text-lg font-bold">多雲時陰</span>
        </div>
      </div>
    </swiper-slide>
  </swiper-container>
</template>
<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
const slideView = ref(3)
const { width } = useWindowSize()
const handleResize = () => {
  if (width.value < 700) {
    slideView.value = 3
  } else {
    slideView.value = 5
  }
}
onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
<style lang="scss" scoped>
.swiper-slide {
  @apply px-1;

  &>div {
    @apply bg-white rounded-xl px-4 py-3 flex-between cursor-pointer un-border;

    &:hover {
      @apply bg-[#4169E1] text-white;
    }
  }
}
</style>
