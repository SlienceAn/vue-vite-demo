<template>
  <el-container class="h-full">
    <el-menu
      :router="true"
      :default-active="$route.path"
      :collapse="menuCollapse"
    >
      <el-menu-item disabled>
        <i-material-symbols-demography class="text-2xl" />
        <template #title>
          {{ config.name }}
        </template>
      </el-menu-item>
      <el-menu-item
        v-for="R in data.menu"
        :key="R.name"
        :index="R.path"
        class="font-bold"
      >
        <component
          :is="R.meta.icon"
          class="text-xl"
        />
        <template #title>
          {{ R.meta.title }}
        </template>
      </el-menu-item>
    </el-menu>
    <el-container>
      <el-header class="navbar">
        <div class="font-bold text-lg inline-flex gap-1 items-center flex-1">
          <i-material-symbols-menu-open
            class="text-xl cursor-pointer"
            @click="handleCollapse"
          />
          {{ $route.meta.title }}
        </div>
        <select-place />
        <div class="flex flex-1 justify-end">
          <ToolList />
        </div>
      </el-header>
      <el-main class="!p-0">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import SelectPlace from './common/SelectPlace.vue'
import config from '@/config'
import ToolList from './common/ToolList.vue'
const globalStore = useGlobalStore()
const loginStore = useLoginStore()
const { menuCollapse } = storeToRefs(globalStore)
const { data } = storeToRefs(loginStore)
const handleCollapse = () => {
  globalStore.$patch({
    menuCollapse: !menuCollapse.value
  })
}
</script>
<style scoped lang="scss">
.navbar {
  @apply h-64px flex items-center;
  @apply border-b border-b-solid border-[--el-menu-border-color];
}

.main-content {
  @apply h-full md: w-5/6;
}

:deep(.el-menu-item) {
  @apply gap-3;

  &:hover {
    @apply bg-white bg-opacity-50;
  }

  &.is-active {
    @apply border-r-solid border-r-5px border-r-[#409EFF] bg-[#F2F6FC] text-[#409EFF];
    @apply dark:bg-white dark:text-black dark:border-r-gray;
  }

  &.is-disabled {
    @apply min-h-[64px] opacity-100 cursor-default font-bold;
  }
}

</style>