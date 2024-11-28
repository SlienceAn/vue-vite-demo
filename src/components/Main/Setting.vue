<template>
  <el-container class="h-full">
    <el-header>
      {{ pusherStore.data }}
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
        api-url="dev/user"
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
import tableFormatter from '@/untils/tableFormatter'
import createPusher from '@/socket'
const isOpen = ref(false)
const informationStore = useInformation()
const pusherStore = usePusherStore()
const { status } = storeToRefs(informationStore)
const { menu, dateFormat } = tableFormatter()
const tableColumn = [
  { label: '帳戶名稱', prop: 'account', width: 120 },
  { label: '使用者名稱', prop: 'username', width: 120 },
  { label: '可使用功能', prop: 'menu', formatter: menu },
  { label: '建立時間', prop: 'created_at', formatter: dateFormat },
  { label: '功能', width: 150 }
]
// const currentDataTotal = computed(() => countList.value.find(el => el.type === status.value)?.message)
const currentDataTotal = 80
onMounted(() => {
  createPusher.init()
})
</script>
<style scoped lang="scss">
:deep(.el-header) {
  @apply flex px-4 items-center gap-4;
}
</style>