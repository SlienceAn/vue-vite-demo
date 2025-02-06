<template>
  <span class="icons hidden-xs-only">
    <el-icon size="24">
      <ElementPlus />
    </el-icon>
    {{ config.name }}
  </span>
  <el-breadcrumb
    separator="/"
    class="bread hidden-sm-and-down"
  >
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
.icons{
  @apply font-700 inline-flex items-center gap-1;
}
.bread{
  @apply inline-flex items-center ml-auto ;
}
:deep(
.el-breadcrumb__inner.is-link) {
  @apply font-700 text-[var(--el-text-color-primary)] ;
}
</style>