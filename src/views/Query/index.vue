<template>
  <el-container>
    <el-header class="header">
      <el-select
        v-model="statusValue"
        placeholder="選擇連線狀態"
        clearable
        class="!w-150px"
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
    </el-header>
    <el-main class="!p-0">
      <div
        v-if="data"
        class="flex px-4 pb-4 flex-wrap gap-1"
      >
        <el-card
          v-for="i in data"
          :key="i"
          class="card"
          shadow="always"
        >
          <template #header>
            <div class="font-bold flex justify-between">
              <component
                :is="statusIcon(i.status)"
              />
              <span>{{ i.address }}</span>
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
              {{ item.value.value[0] }}
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
import tableFormatter from '@/untils/tableFormatter'
const { statusIcon } = tableFormatter()
const informationStore = useInformation()
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
</script>
<style scoped lang="scss">
.header {
  @apply flex px-4 items-center gap-4;
}

:deep(.el-card__header) {
  @apply py-2;
}

.card {
  @apply box-border w-full md:max-w-[calc(25%-0.25rem)];
}

.error {
  @apply ring-0.5 ring-red-500 bg-gradient-to-t from-red-500/40 via-white;
}
</style>