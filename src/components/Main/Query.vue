<template>
  <el-container>
    <el-header class="flex items-center justify-between !p-4">
      <div class="ring w-full flex gap-4 justify-between">
        <el-select
          v-model="statusValue"
          placeholder="選擇連線狀態"
          multiple
        >
          <template
            v-for="opt in statusList"
            :key="opt.label"
          >
            <el-option
              :label="opt.label"
              :value="opt.value"
            />
          </template>
        </el-select>
        <el-button
          type="primary"
          :icon="Search"
          @click="searchData"
        >
          搜尋
        </el-button>
        <el-tooltip
          effect="dark"
          content="所有異常點"
          class="cursor-pointer"
        >
          <el-button type="danger">
            <el-icon
              size="18"
              class="cursor-pointer"
            >
              <LocationFilled />
            </el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </el-header>
    <el-main class="!p-0">
      <div
        v-if="data.length !== 0"
        class="p-4 grid grid-cols-3 gap-4"
      >
        <el-card
          v-for="i in data"
          :key="i"
          class="cursor-pointer"
          :class="{ error: i.status === 'abnormal' }"
          shadow="always"
        >
          <template #header>
            <div class="font-bold flex justify-between">
              <span>{{ i.id }}</span> <span>{{ i.address }}</span>
            </div>
          </template>
          <div
            v-for="item in i.data"
            :key="item.item"
            class="flex"
          >
            <div class="min-w-1/4 py-1">
              {{ item.item }}
            </div>
            <div class="min-w-1/4 py-1 text-center">
              {{ item.value }}
            </div>
            <div class="min-w-1/4 py-1 text-right">
              {{ item.unit }}
            </div>
            <div class="min-w-1/4 py-1 text-right">
              {{ item.text }}
            </div>
          </div>
        </el-card>
      </div>
      <el-empty
        v-else
        description="暫無查詢結果"
      />
    </el-main>
  </el-container>
  <el-drawer v-model="isC">
    <span>cccc</span>
  </el-drawer>
</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const informationStore = useInformation()
const globalStore = useGlobalStore()
const { city } = storeToRefs(globalStore)
const { data } = storeToRefs(informationStore)
const isC = ref(true)
const statusValue = ref([])
const statusList = ref([
  {
    value: 'disconnect',
    label: '已斷線',
  },
  {
    value: 'abnormal',
    label: '連線異常',
  },
  {
    value: 'online',
    label: '已連線',
  },
])
const searchData = () => {
  informationStore.getQeryData()
}
onMounted(() => searchData())
watch(city, () => searchData())
</script>
<style scoped lang="scss">
.error {
  @apply ring-0.5 ring-red-400 bg-gradient-to-t from-red-400/40 via-white;
}
</style>