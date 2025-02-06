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
      <div class="flex flex-col items-center">
        <span class="whitespace-nowrap p-2">{{ dayjs().add(i,'day').format('YYYY-MM-DD') }}</span>
        <span class="py-4">
          <i-material-symbols-partly-cloudy-day class="text-[3rem]" />
        </span>
        <span class="temp mb-4">16℃ - 21℃</span>
        <span class="rain flex-center gap-2">
          <i-material-symbols-rainy class="text-[1rem]" />
          10%
        </span>
      </div>
    </swiper-slide>
  </swiper-container>
</template>
<script lang="ts" setup>
import { dayjs } from 'element-plus'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
const slideView = ref(5)
const handleResize = () => {
  if (width.value < 768) {
    slideView.value = 3
  } else if (width.value >= 768) {
    slideView.value = 4
  } else if (width.value >= 1200) {
    slideView.value = 6
  } else if (width.value >= 1920) {
    slideView.value = 7
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
    @apply bg-white rounded-xl px-4 py-3 cursor-pointer un-border;

    &:hover {
      @apply bg-[#4169E1] text-white;
    }
  }
}
</style>
