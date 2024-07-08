<template>
  <div class="login-container">
    <div class="login-background" />
    <el-card class="login-card">
      <div class="login-header">
        <h2 class="login-title">
          Project
        </h2>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.account"
            placeholder="請輸入帳號"
          >
            <template #prefix>
              <el-icon class="input-icon">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="請輸入密碼"
          >
            <template #prefix>
              <el-icon class="input-icon">
                <Lock />
              </el-icon>
            </template>
            <template #suffix>
              <el-icon
                class="password-icon"
                @click="togglePassword"
              >
                <View v-if="showPassword" />
                <Hide v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="login-button"
          :loading="loading"
          @click="handleSubmit"
        >
          登入
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="tsx">
import { User, Lock, View, Hide } from '@element-plus/icons-vue'
const loginStore = useLoginStore()
const { loginForm } = storeToRefs(loginStore)
const loginFormRef = ref(null)
const showPassword = ref(false)
const loading = ref(false)

const rules = {
  username: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 3, max: 20, message: '長度應在 3 到 20 個字符之間', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, max: 20, message: '長度應在 6 到 20 個字符之間', trigger: 'blur' }
  ]
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = () => {
  loginStore.postLogin()
}
</script>

<style scoped lang="scss">
.login-container {
  @apply flex justify-center items-center h-screen bg-[#f0f2f5] relative overflow-hidden;
}

.login-background {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  transform: rotate(-45deg);
  z-index: -1;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.login-title {
  font-size: 28px;
  color: #303133;
  margin: 0;
  font-weight: 600;
}

.login-button {
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(45deg, #6a7dfe, #cd84f1);
  border: none;
  margin-top: 20px;
  transition: transform 0.3s ease;
}

.login-button:hover {
  transform: translateY(-2px);
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.forget-password {
  font-size: 14px;
}

.social-login {
  margin-top: 30px;
  text-align: center;
}

.social-login-text {
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-icon-btn {
  background-color: transparent;
  border: 1px solid #dcdfe6;
}

.social-icon {
  width: 20px;
  height: 20px;
}

.input-icon,
.password-icon {
  color: #606266;
}

:deep(.el-input__wrapper) {
  padding-right: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

:deep(.el-input__inner) {
  height: 44px;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #303133;
}
</style>