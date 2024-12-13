<template>
  <el-container class="h-full">
    <el-header>
      <div class="w-240px">
        <el-input
          placeholder="輸入使用者名稱"
          :prefix-icon="Search"
        />
      </div>
      <el-button
        type="primary"
        :icon="Plus"
        class="ml-auto !font-700"
        @click="handleOpen"
      >
        新增帳戶
      </el-button>
    </el-header>
    <el-main class="!p-4 bg-white">
      <Table
        :table-column="tableColumn"
        :data="data"
        :total="currentDataTotal"
        index-column
      />
    </el-main>
  </el-container>
  <SettingModal />
</template>
<script setup lang="tsx">
import { Plus, Search } from '@element-plus/icons-vue'
import Table from '@/components/common/Table.vue'
import SettingModal from './SettingModal.vue'
import tableFormatter from '@/untils/tableFormatter'
const userStore = useUserForm()
const { data } = storeToRefs(userStore)
const { menu, dateFormat, settingTool } = tableFormatter()
const currentDataTotal = computed(() => data.value.length)
const tableColumn = [
  { label: '帳戶名稱', prop: 'account', width: 150 },
  { label: '使用者名稱', prop: 'username', width: 120 },
  { label: '可使用功能', prop: 'menu', formatter: menu },
  { label: '建立時間', prop: 'created_at', width: 200, formatter: dateFormat },
  { label: '功能', width: 150, formatter: settingTool }
]
const handleOpen = () => {
  userStore.$patch({
    isDialog: true,
    dialogFunc: 1,
  })
  userStore.resetForm()
}
</script>
<style scoped lang="scss">
:deep(.el-header) {
  @apply h-56px w-full bg-white px-4 border-b-solid border-b-1 box-border border-[#dcdfe6] flex items-center;
}
</style>