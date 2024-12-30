<template>
  <swiper-container
    class="w-full absolute bottom-0 left-0 right-0"
    slides-per-view="4"
    speed="500"
    loop="true"
  >
    <swiper-slide
      v-for="i in 10"
      :key="i"
      class="p-2"
    >
      <Card
        title="title"
        message="message"
        color="info"
      />
    </swiper-slide>
  </swiper-container>
</template>
<script lang="ts" setup>
import Card from '@/components/Card.vue'
</script>
