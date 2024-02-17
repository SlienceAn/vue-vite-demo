<template>
  <el-container>
    <el-header class="flex items-center justify-between !p-2">
      <div class="w-1/2 flex gap-2">
        <el-select
          v-model="statusValue"
          placeholder="選擇狀態"
          @change="searchData"
        >
          <el-option
            label="已連線"
            value="online"
          />
          <el-option
            label="連線異常"
            value="abnormal"
          />
          <el-option
            label="已斷線"
            value="disconnect"
          />
        </el-select>
        <el-date-picker
          type="daterange"
          range-separator="~"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
        />
        <el-button
          type="primary"
          :icon="Search"
          @click="searchData"
        >
          搜尋
        </el-button>
      </div>
    </el-header>
    <el-main class="!p-0">
      <div
        v-if="data.length !== 0"
        class="p-2 flex flex-wrap"
      >
        <el-card
          v-for="i in data"
          :key="i"
          class="w-1/4"
        >
          <div>{{ i.id }}</div>
          <div>card</div>
        </el-card>
      </div>
      <el-empty
        v-else
        description="暫無查詢結果"
      />
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const informationStore = useInformation()
const { data } = storeToRefs(informationStore)
const statusValue = ref('')
const searchData = () => {
  informationStore.getQeryData()
  console.log(data.value)
}
</script>
<style scoped lang="scss">
$triangle-width: 13px;

.switch {
  position: relative;
  @apply inline-block px-4 py-2 bg-blue-600 text-white font-bold border-r;

  &:hover {
    @apply cursor-pointer bg-blue-800;
  }

  &:first-child {
    @apply rounded-tl-lg rounded-bl-lg;
  }

  &:last-child {
    @apply rounded-tr-lg rounded-br-lg border-0;
  }

  &-active {
    @apply bg-blue-900;

    &::before {
      content: "";
      position: absolute;
      bottom: -($triangle-width*1.75);
      left: calc(50% - $triangle-width);
      border-style: solid;
      border-width: $triangle-width*1.75 $triangle-width 0 $triangle-width;
      @apply w-0 h-0 border-l-transparent border-t-blue-900 border-r-transparent;
    }
  }
}
</style>