<template>
  <div class="flex flex-wrap py-2">
    <div
      v-for="i in filterList"
      :key="i"
      class="card"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="font-bold flex justify-between">
            <component :is="statusIcon(i.status)" />
            <span>{{ i.address }}</span>
          </div>
        </template>
        <div class="sub">
          <span>緯度</span>
          <span v-wgs.lat="i.latitude" />
        </div>
        <div class="sub">
          <span>經度</span>
          <span v-wgs.lon="i.longitude" />
        </div>
        <div class="sub">
          <span>累積天數</span>
          <span v-accumulation="i.latestUpdate" />
        </div>
        <template #footer>
          <div class="sub">
            <span>最後更新</span> {{ i.latestUpdate }}
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import directives from '@/untils/directives'
import tableFormatter from '@/untils/tableFormatter'
defineOptions({ directives })
const queryStore = useQueryStore()
const { filterList } = storeToRefs(queryStore)
const { statusIcon } = tableFormatter()
</script>
<style lang="scss" scoped>
.card {
    @apply w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/5 2xl:w-1/6 p-2 box-border ;

}

.sub {
    @apply flex justify-between py-2;
}
</style>