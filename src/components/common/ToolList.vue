<template>
  <!-- <el-tooltip content="最新消息">
    <el-badge :value="9">
      <i-material-symbols-notifications
        class="text-[16px] border-solid p-2"
      />
    </el-badge>
  </el-tooltip> -->
  <el-tooltip content="切換主題">
    <el-button
      class="!border-none !px-2"
      @click="toggleDark()"
    >
      <i-material-symbols-wb-sunny
        v-if="isDark"
        class="text-[16px]"
      />
      <i-material-symbols-dark-mode
        v-else
        class="text-[16px]"
      />
    </el-button>
  </el-tooltip>
  <el-tooltip
    content="登出"
  >
    <el-button
      class="!border-none !px-2"
      @click="loginOut"
    >
      <i-material-symbols-logout class="text-[16px]" />
    </el-button>
  </el-tooltip>
</template>
<script setup lang="tsx">
import { useDark, useToggle } from '@vueuse/core'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const isDark = useDark()
const loginStore = useLoginStore()
const toggleDark = useToggle(isDark)
const loginOut = () => {
  ElMessageBox.confirm(
    '確定要登出嗎?',
    '提醒',
    {
      confirmButtonText: '登出',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    loginStore.$patch({ token: '' })
    router.replace('/login')
  })
}
</script>