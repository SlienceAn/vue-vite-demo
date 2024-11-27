<template>
  <el-dialog
    :model-value="isOpen"
    @close="close"
  >
    <template #header>
      <div>新增資料</div>
    </template>
    <el-form>
      <el-form-item
        label="帳戶"
        label-position="top"
      >
        <el-input
          type="text"
          placeholder="user"
        />
      </el-form-item>
      <el-form-item
        label="密碼"
        label-position="top"
      >
        <el-input
          type="text"
          placeholder="user"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          送出
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="tsx" setup>
defineProps({
  isOpen: {
    type: Boolean
  }
})
const emit = defineEmits(['update:close'])
const close = () => {
  emit('update:close', false)
}
</script>
<style scoped lang="scss"></style>