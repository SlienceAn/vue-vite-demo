<template>
  <el-container class="h-full">
    <el-header class="header">
      <el-select
        v-model="statusValue"
        placeholder="選擇連線狀態"
        clearable
        class="!w-180px mr-2"
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
      <el-scrollbar>
        <div
          v-if="data"
          class="flex flex-wrap gap-2 p-4"
        >
          <el-card
            v-for="i in data"
            :key="i"
            class="card"
            :class="{ error: i.status === 'disconnect' }"
            shadow="always"
          >
            <template #header>
              <div class="font-bold flex justify-between">
                <component :is="statusIcon(i.status)" />
                <span>{{ i.address }}</span>
              </div>
            </template>
            <div
              v-for="item in i.data"
              :key="item.item"
              class="flex"
            >
              <div class="min-w-1/3 py-1 font-bold">
                {{ item.text }}
              </div>
              <div class="min-w-1/3 py-1 text-center">
                {{ item.value.value[0] }}
              </div>
              <div class="min-w-1/3 py-1 text-right text-[12px] font-bold">
                {{ item.unit }}
              </div>
            </div>
          </el-card>
        </div>
        <el-empty
          v-else
          description="撈取資料錯誤"
        />
      </el-scrollbar>
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
const queryStore = useQueryStore()
const { data } = storeToRefs(queryStore)
const statusValue = ref([])
const isOpen = ref(false)
const statusList = ref([
  {
    value: 'disconnect',
    label: '斷線',
  },
  {
    value: 'abnormal',
    label: '連線異常',
  },
  {
    value: 'online',
    label: '連線',
  },
])
onMounted(()=>queryStore.getQuery())
</script>
<style scoped lang="scss">
.header {
  @apply h-56px w-full px-4 border-b-solid border-b-1 box-border border-[#dcdfe6] flex items-center;
}

:deep(.el-card__header) {
  @apply py-2;
}

.card {
  @apply rounded-2xl ring-0.5 ring-gray-300 cursor-pointer w-full md:max-w-[calc(25%-0.5rem)];
  @apply dark:bg-[#333] dark:text-white;
}

.error {
  @apply ring-0.5 ring-red-300 bg-gradient-to-t from-red-500/30 via-white;
}
</style>