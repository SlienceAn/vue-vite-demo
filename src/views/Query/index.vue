<template>
  <el-container class="h-full">
    <el-header class="header">
      <el-form>
        <el-form-item
          label="篩選狀態"
          class="!mb-0"
        >
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
        </el-form-item>
      </el-form>

      <el-tooltip
        effect="dark"
        content="所有異常點"
        class="cursor-pointer"
      >
        <el-button
          type="primary"
          class="!ml-auto"
          :icon="Plus"
          @click="isOpen = true"
        >
          新增
        </el-button>
      </el-tooltip>
    </el-header>
    <el-main class="!p-0">
      <el-scrollbar>
        <div
          v-if="filterList"
          class="flex flex-wrap gap-4 p-4"
        >
          <el-card
            v-for="i in filterList"
            :key="i"
            class="card"
            shadow="always"
          >
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
import { Plus } from '@element-plus/icons-vue'
import DrawerList from './drawerList.vue'
import directives from '@/untils/directives'
import tableFormatter from '@/untils/tableFormatter'
defineOptions({ directives })
const { statusIcon } = tableFormatter()
const queryStore = useQueryStore()
const globalStore = useGlobalStore()
const { city } = storeToRefs(globalStore)
const { statusValue, statusList, filterList } = storeToRefs(queryStore)
const isOpen = ref(false)
onMounted(() => queryStore.getQuery())
watch(city, () => queryStore.getQuery())
</script>
<style scoped lang="scss">
.header {
  @apply h-56px w-full px-4 border-b-solid border-b-1 box-border border-[var(--el-border-color)] flex items-center;
}

:deep(.el-card__header) {
  @apply py-2;
}

.card {
  @apply rounded-2xl ring-0.5 ring-[var(--el-border-color)] cursor-pointer w-full md:max-w-[calc(25%-1rem)];
}

.error {
  // @apply ring-0.5 ring-red-300 bg-gradient-to-t from-red-500/30 via-white;
  // @apply bg-[var(--el-color-error)] border-[var(--el-color-error)];
}

.sub {
  @apply flex justify-between py-2;
}
</style>