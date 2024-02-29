<template>
  <div class="relative w-full h-full">
    <div class="loginBox">
      <el-form
        :model="loginForm"
        :rules="rules"
      >
        <el-form-item
          prop="account"
          label="帳號"
        >
          <el-input v-model="loginForm.account" />
        </el-form-item>
        <el-form-item
          prop="password"
          label="密碼"
        >
          <el-input v-model="loginForm.password" />
        </el-form-item>
        <el-button @click="login" />
      </el-form>
    </div>
  </div>
</template>
<script setup lang="tsx">
const loginStore = useLoginStore()
const { loginForm } = storeToRefs(loginStore)
const login = () => loginStore.postLogin()
const rules = {
  account: [
    { required: true, message: '請輸入帳號', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入帳號', trigger: 'blur' }
  ]
}
</script>
<style scoped lang="scss">
.loginBox {
  @apply w-1/3;
}
</style>
