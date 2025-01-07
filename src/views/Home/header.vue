<template>
  <el-breadcrumb
    separator="/"
    class="py-2 px-4 bg-white text-right flex justify-end"
  >
    <span class="font-bold mr-auto flex items-center gap-1">
      <el-icon size="18">
        <ElementPlus />
      </el-icon>
      {{ config.name }}
    </span>
    <el-breadcrumb-item
      v-for="R in data.menu"
      :key="R.path"
      :to="{ path: R.path }"
    >
      {{ R.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import config from '@/config'
const loginStore = useLoginStore()
const { data } = storeToRefs(loginStore)
</script>
<style lang="scss" scoped>
:deep(.el-breadcrumb__item) {
  @apply clear-left ;
}
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
  @apply text-amber ;
}
</style>