<template>
  <el-container class="h-full">
    <el-header class="h-auto border-b-solid border-b-1 border-b-[--el-border-color]">
      <Header />
    </el-header>
    <el-main class="!p-0 h-full">
      <div class="flex-center h-full">
        <div class="info">
          <div class="info-header">
            <span>Card name</span>
          </div>
          <div class="info-body">
            <p
              v-for="o in 4"
              :key="o"
              class="text item"
            >
              {{ 'List item ' + o }}
            </p>
          </div>

          <div class="info-footer">
            <InfoSwiper />
          </div>
        </div>
        <div class="map-container w-[45%] h-full">
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
</script>
<style  lang="scss" scoped>
.info {
  @apply w-[55%] h-full  border-r-solid border-r-1 border-r-[--el-border-color];

  &-header {
    @apply border-solid border-1;
  }
}
</style>