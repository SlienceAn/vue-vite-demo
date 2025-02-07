<template>
  <span class="icons">
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
  <el-dropdown
    trigger="click"
    class="inline-flex hidden-md-and-up ml-auto"
  >
    <span class="dropdown">
      <el-icon><Menu /></el-icon>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="R in data.menu"
          :key="R.path"
        >
          <router-link
            :to="{ path: R.path }"
          >
            {{ R.meta.title }}
          </router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import config from '@/config'
const loginStore = useLoginStore()
const { data } = storeToRefs(loginStore)
</script>
<style lang="scss" scoped>
.icons {
  @apply font-700 inline-flex items-center gap-1;
}

.bread {
  @apply inline-flex items-center ml-auto;
}

:deep(.el-breadcrumb__inner.is-link) {
  @apply font-700 text-[var(--el-text-color-primary)];
}

.dropdown {
  @apply el-dropdown-link un-border inline-flex items-center font-bold py-2 px-4 rounded-lg;
}
:deep(.el-dropdown-menu__item ){
  @apply p-0 ;

  & a {
    @apply no-underline block w-full text-center text-black font-700 py-[5px] px-[16px];
  }
}
</style>