<template>
  <div class="wrapper">
    <div class="views">
      <div class="back-panel" />
      <div class="front-panel">
        <div class="text-center py-6 font-bold text-3xl title">
          {{ config.name }}
        </div>
        <el-form
          refs="form"
          :model="loginForm"
          :rules="rules"
          label-width="auto"
          label-position="top"
          hide-required-asterisk
          class="px-10 py-6"
        >
          <el-form-item
            prop="account"
            label="帳號"
            class="label"
          >
            <el-input
              v-model="loginForm.account"
              autofocus
              placeholder="請輸入帳號"
              size="large"
            />
          </el-form-item>
          <el-form-item
            prop="password"
            label="密碼"
            class="font-bold text-2xl"
          >
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="請輸入密碼"
              size="large"
            />
          </el-form-item>
          <el-button
            type="primary"
            class="btn"
            :loading="isLoading"
            @click="login"
          >
            登入
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="tsx">
import config from '@/config'
const loginStore = useLoginStore()
const { loginForm, isLoading } = storeToRefs(loginStore)
const login = () => loginStore.postLogin()
const rules = {
  account: [
    { required: true, message: '請輸入帳號', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' }
  ]
}
</script>
<style scoped lang="scss">
.wrapper {
  @apply flex flex-col justify-center bg-white min-h-screen;
}

.views {
  @apply relative py-3 sm:max-w-xl sm:mx-auto;
}

.back-panel {
  @apply rounded-3xl absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-700 shadow-lg transform;
  @apply sm:rotate-6;
}

.front-panel {
  @apply relative px-4 py-10 bg-[#fff] shadow-lg rounded-3xl border border-gray-200 border-2;
  @apply sm:p-0 sm:w-[400px];

  .label {
    @apply font-bold text-2xl;
  }

  .btn {
    padding: 18px 0 18px 0;
    @apply font-bold w-full mt-2;
  }
}

.title {
  @apply text-[#333];
  // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
}
</style>
