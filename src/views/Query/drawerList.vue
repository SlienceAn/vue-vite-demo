<template>
  <el-drawer
    :model-value="isOpen"
    size="30%"
    class="!shadow-none border-l-solid border-0.5 border-[var(--el-border-color)]"
    @close="close"
  >
    <template #header>
      <div class="font-bold text-xl text-center text-[var(--el-text-color-primary)]">
        編輯測站設備資訊
      </div>
    </template>
    <el-form>
      <el-form-item
        label-position="top"
        label="Activity name"
      >
        <el-input />
      </el-form-item>
      <el-form-item
        label-position="top"
        label="Activity name"
      >
        <el-input />
      </el-form-item>
      <el-form-item
        label-position="top"
        label="Activity name"
      >
        <el-input />
      </el-form-item>
      <el-form-item
        label-position="top"
        label="Activity name"
      >
        <el-input />
      </el-form-item>
      <el-form-item
        label-position="top"
        label="Activity name"
      >
        <el-input />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary">
        送出
      </el-button>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
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