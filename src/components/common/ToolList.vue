<template>
  <el-tooltip content="最新消息">
    <el-badge :value="9">
      <el-button>
        <i-material-symbols-notifications
          class="text-[14px]"
        />
      </el-button>
    </el-badge>
  </el-tooltip>
  <el-tooltip content="切換主題">
    <el-button
      @click="toggleDark()"
    >
      <i-material-symbols-wb-sunny
        v-if="isDark"
        class="text-[14px]"
      />
      <i-material-symbols-dark-mode
        v-else
        class="text-[14px]"
      />
    </el-button>
  </el-tooltip>
  <el-tooltip
    content="登出"
    class="border-solid"
  >
    <el-button @click="loginOut">
      <i-material-symbols-logout class="text-xl" />
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