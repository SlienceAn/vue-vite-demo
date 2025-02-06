<template>
  <el-container class="h-full">
    <el-header class="!h-auto un-border-b flex !py-1">
      <Header />
    </el-header>
    <el-main class="!p-0 h-full">
      <div class="flex-center h-full">
        <div class="info">
          <div class="info-body">
            <Content />
          </div>
          <div class="info-footer">
            <InfoSwiper />
          </div>
        </div>
        <div class="map-container">
          <Map />
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script lang="tsx" setup>
import Header from './header.vue'
import InfoSwiper from './infoSwiper.vue'
import Map from './map.vue'
import Content from './content.vue'
</script>
<style lang="scss" scoped>

.info {
  @apply flex flex-col w-full h-full un-border-r;
  @apply md:w-[55%];

  &-body {
    @apply flex-1 un-border-b p-4;
  }
}

.map-container {
  @apply h-full bg-[#afd2f1];
  @apply md:w-[45%];
}
</style>