<template>
  <el-drawer
    :model-value="isOpen"
    size="30%"
    class="!shadow-none border-l-solid border-0.5 border-[var(--el-border-color)]"
    @close="close"
  >
    <template #header>
      <div class="font-bold text-xl text-[var(--el-text-color-primary)]">
        編輯測站設備資訊
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
// const queryStore = useQueryStore()
// const { data } = storeToRefs(queryStore)
defineProps({
  isOpen: {
    type: Boolean
  }
})
const emit = defineEmits(['update:close', 'list'])
const close = () => {
  emit('update:close', false)
}
</script>