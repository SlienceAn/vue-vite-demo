<template>
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
</template>
<script setup lang="tsx">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>