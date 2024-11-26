<template>
  <el-container class="h-full">
    <el-menu
      :router="true"
      :default-active="$route.path"
      :collapse="menuCollapse"
      class="!border-none el-menu-main"
    >
      <el-menu-item disabled>
        <i-material-symbols-cable class="text-2xl" />
        <template #title>
          Vue Demo
        </template>
      </el-menu-item>
      <el-menu-item
        v-for="R in data.menu"
        :key="R.name"
        :index="R.path"
        class="font-bold"
      >
        <component
          :is="R.icon"
          class="text-xl"
        />
        <template #title>
          {{ R.name }}
        </template>
      </el-menu-item>
    </el-menu>
    <el-container>
      <el-header class="navbar">
        <span
          class="flex items-center gap-2 hover:cursor-pointer"
          @click="handleCollapse"
        >
          <i-material-symbols-menu-open class="text-xl" />
          <span class="font-bold text-lg">{{ $route.name }}</span>
        </span>
        <select-place />
        <el-button
          class="border-none"
          @click="$router.replace('/login')"
        >
          <i-material-symbols-logout class="text-xl" />
        </el-button>
      </el-header>
      <el-main class="bg-[#E4E7ED] !p-0">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import SelectPlace from './common/SelectPlace.vue'
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
  @apply flex justify-between items-center h-64px;
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
  }

  &.is-disabled {
    @apply min-h-[64px] opacity-100 cursor-default font-bold border-r-1 border-[--el-menu-border-color] border-r-solid;
  }
}
</style>