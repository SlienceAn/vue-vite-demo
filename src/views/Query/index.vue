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
        <DataCard />
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
import DataCard from './dataCard.vue'
const queryStore = useQueryStore()
const globalStore = useGlobalStore()
const { city } = storeToRefs(globalStore)
const { statusValue, statusList } = storeToRefs(queryStore)
const isOpen = ref(false)
onMounted(() => queryStore.getQuery())
watch(city, () => queryStore.getQuery())

</script>
<style scoped lang="scss">
.header {
  @apply h-56px w-full px-4 border-b-solid border-b-1 box-border border-[var(--el-border-color)] flex items-center;
}
</style>