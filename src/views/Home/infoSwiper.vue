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
      class="px-2"
    >
      <el-card
        shadow="always"
        class="rounded-2xl"
      >
        Always
      </el-card>
    </swiper-slide>
  </swiper-container>
</template>
<script lang="ts" setup>
</script>
