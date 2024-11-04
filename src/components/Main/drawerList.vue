<template>
  <el-drawer
    :model-value="isOpen"
    class="!p-0"
    size="35%"
    @close="close"
  >
    <template #header>
      <div class="font-bold">
        所有異常測點
      </div>
    </template>
    <div
      v-for="i in list"
      :key="i"
      class="flex gap-2 border-b py-4 px-2"
    >
      <span>{{ i.id }}</span>
      <span>{{ i.address }}</span>
      <span>{{ i.latitude }}</span>
      <span>{{ i.longitude }}</span>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
const informationStore = useInformation()
const { data } = storeToRefs(informationStore)
defineProps({
  isOpen: {
    type: Boolean
  }
})
const emit = defineEmits(['update:close', 'list'])
const close = () => {
  emit('update:close', false)
}
const list = computed(() => {
  return data.value.filter(item => item.status === 'abnormal')
})
</script>
<style scoped lang="scss">
//無作用...待修改
:deep(.el-drawer__body) {
  @apply p-0;
}
</style>