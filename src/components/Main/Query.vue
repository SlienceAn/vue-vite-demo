<template>
  <el-container>
    <el-header class="flex items-center justify-between !p-4">
      <div class="w-full flex gap-4">
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
          <el-badge
            :value="9"
            type="danger"
            class="item !ml-auto"
          >
            <el-button
              type="info"
              @click="isOpen = true"
            >
              <el-icon size="18">
                <LocationFilled />
              </el-icon>
            </el-button>
          </el-badge>
        </el-tooltip>
      </div>
    </el-header>
    <el-main class="!p-0">
      <div
        v-if="data"
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
        description="撈取資料錯誤"
      />
    </el-main>
  </el-container>
  <DrawerList
    :is-open="isOpen"
    @update:close="isOpen = $event"
  />
</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import DrawerList from './drawerList.vue'
const informationStore = useInformation()
const globalStore = useGlobalStore()
const { city } = storeToRefs(globalStore)
const { data } = storeToRefs(informationStore)
const statusValue = ref([])
const isOpen = ref(false)
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
  @apply ring-0.5 ring-red-500 bg-gradient-to-t from-red-500/40 via-white;
}
</style>