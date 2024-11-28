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
          v-model="form.account"
          type="text"
          placeholder="user"
        />
      </el-form-item>
      <el-form-item
        label="密碼"
        label-position="top"
      >
        <el-input
          v-model="form.password"
          type="text"
          placeholder="user"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="使用者名稱"
        label-position="top"
      >
        <el-input
          v-model="form.username"
          type="text"
          placeholder="請輸入使用者名稱"
        />
      </el-form-item>
      <el-form-item
        label="可使用功能"
        label-position="top"
      >
        <el-select
          v-model="form.menu"
          multiple
          clearable
        >
          <el-option
            v-for="i in 4"
            :key="i"
            :value="i"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="userStore.addUser"
        >
          送出
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="tsx" setup>
const userStore = useUserForm()
const { form } = storeToRefs(userStore)
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