<template>
  <div class="wrap">
    <Header />
    <InfoCard class="w-[20%] h-[70%] absolute top-15 left-5 " />
    <InfoCard class="w-[20%] h-[70%] absolute top-15 right-5 " />
    <Map />
    <InfoSwiper />
  </div>
</template>
<script lang="tsx" setup>
import Header from './header.vue'
import InfoSwiper from './infoSwiper.vue'
import InfoCard from './infoCard.vue'
import Map from './map.vue'
</script>
<style scoped>
.wrap {
  @apply relative w-full h-full overflow-hidden bg-blue-300;
}
</style>