<template>
  <div class="wrapper">
    <div class="bg" />
    <div class="views">
      <!-- <div class="back-panel" /> -->
      <div class="front-panel">
        <div class="text-center py-6 font-bold text-2xl title">
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
  @apply flex bg-[#09486b] min-h-screen;
}

.bg {
  background-image: url('/iot-wallpaper.webp');
  @apply w-[65%] bg-cover bg-center bg-no-repeat;
}

.views {
  @apply w-[35%] p-5 flex-center;
}

// .back-panel {
//   @apply rounded-3xl absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-700 shadow-lg transform;
//   @apply sm:rotate-6;
// }

.front-panel {
  @apply bg-[#fff] rounded-xl w-80%;
  // @apply sm:p-0 sm:w-[400px];

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
}
</style>
