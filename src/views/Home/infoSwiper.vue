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
      class="px-1"
    >
      <div
        shadow="always"
        class=" bg-white rounded-xl px-4 py-2 flex items-center justify-between"
      >
        <i-material-symbols-partly-cloudy-day class="text-[2rem]" />
        <span class="text-lg">多雲時陰</span>
        <span class="text-lg">22°C</span>
      </div>
    </swiper-slide>
  </swiper-container>
</template>
<script lang="ts" setup>
</script>
