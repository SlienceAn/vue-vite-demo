<template>
  <swiper-container
    class="w-full absolute bottom-0 left-0 right-0 py-4"
    slides-per-view="4"
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
</script>
<style lang="scss" scoped>
.swiper-slide {
  @apply px-1;

  &>div {
    @apply bg-white rounded-xl px-4 py-3 flex-between cursor-pointer;

    &:hover {
      @apply bg-[#4169E1] text-white;
    }
  }
}
</style>
