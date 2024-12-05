<template>
  <el-dialog
    v-model="isDialog"
  >
    <template #header>
      <h2 class="m-0 text-center">
        {{ title }}
      </h2>
    </template>
    <el-form>
      <el-form-item
        label="帳戶"
        label-position="top"
      >
        <el-input
          v-model="form.account"
          type="text"
          placeholder="請輸入使用者名稱"
        />
      </el-form-item>
      <el-form-item
        label="密碼"
        label-position="top"
      >
        <el-input
          v-model="form.password"
          type="text"
          placeholder="請輸入密碼"
          :disabled="dialogFunc === 1"
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
          placeholder="請選擇功能頁"
        >
          <el-option
            label="主控台"
            :value="1"
          />
          <el-option
            label="設備查詢"
            :value="2"
          />
          <el-option
            label="巡檢表單"
            :value="3"
          />
          <el-option
            label="帳戶管理"
            :value="4"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="m-auto"
          @click="userStore.handleSumbit"
        >
          送出
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="tsx" setup>
const userStore = useUserForm()
const { form, isDialog, dialogFunc } = storeToRefs(userStore)
const title = computed(() => {
  return dialogFunc.value === 1 ? '新增資料' : '編輯資料'
})
</script>