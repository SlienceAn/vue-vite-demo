<template>
  <el-container class="h-full">
    <el-header class="!h-auto un-border-b">
      <Header />
    </el-header>
    <el-main class="!p-0 h-full">
      <div class="flex-center h-full">
        <div class="info">
          <div class="info-body">
            <el-select class="mb-4 md:!hidden" />
            <el-row :gutter="10">
              <el-col
                :xs="12"
                :md="12"
                :lg="8"
              >
                <Card
                  title="總機台數量"
                  :message="22"
                  color="blue"
                >
                  <template #icon>
                    <InfoFilled />
                  </template>
                </Card>
              </el-col>
              <el-col
                :xs="12"
                :md="12"
                :lg="8"
              >
                <Card
                  title="總斷線數量"
                  :message="130"
                  color="red"
                >
                  <template #icon>
                    <CircleCloseFilled />
                  </template>
                </Card>
              </el-col>
              <el-col
                :xs="12"
                :md="12"
                :lg="8"
              >
                <Card
                  title="連線異常數量"
                  :message="390"
                  color="green-7"
                >
                  <template #icon>
                    <Warning />
                  </template>
                </Card>
              </el-col>
            </el-row>
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
import Card from '@/components/Card.vue'
</script>
<style lang="scss" scoped>
.el-col {
  @apply mb-4;
}

.info {
  @apply flex flex-col w-full h-full un-border-r;
  @apply md:w-[55%];

  &-body {
    @apply flex-1 un-border-b p-4;
  }
}

.map-container {
  @apply h-full;
  @apply md:w-[45%];
}
</style>