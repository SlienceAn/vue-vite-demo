<template>
  <el-container class="h-full">
    <el-header>
      <el-button
        type="primary"
        :icon="Plus"
        class="ml-auto"
        @click="isOpen = true"
      >
        新增
      </el-button>
    </el-header>
    <el-main class="!pt-0">
      <Table
        :table-column="tableColumn"
        :params="{ status }"
        api-url="device"
        :total="currentDataTotal"
      />
    </el-main>
  </el-container>
  <SettingModal
    :is-open="isOpen"
    @update:close="isOpen = $event"
  />
</template>
<script setup lang="tsx">
import { Plus } from '@element-plus/icons-vue'
import Table from '@/components/common/Table.vue'
import SettingModal from './SettingModal.vue'
const isOpen = ref(false)
// import tableFormatter from '@/untils/tableFormatter'
const informationStore = useInformation()
const { status } = storeToRefs(informationStore)
// const { statusIcon, accumulation } = tableFormatter()
const tableColumn = [

]
// const currentDataTotal = computed(() => countList.value.find(el => el.type === status.value)?.message)
const currentDataTotal = 80
</script>
<style scoped lang="scss">
:deep(.el-header) {
  @apply flex px-4 items-center gap-4;
}
</style>