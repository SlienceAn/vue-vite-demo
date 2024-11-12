<template>
  <el-container class="h-full">
    <el-aside class="side">
      <div class="h-64px items-center flex gap-2 px-4 border-solid border-b-1px">
        <i-material-symbols-javascript class="text-4xl" />
        <span>vue3-demo</span>
      </div>
      <el-menu
        class="!border-none"
        default-active="1"
      >
        <el-menu-item
          v-for="(R, idx) in data.menu"
          :key="R.name"
          :index="idx.toString()"
          :route="{ path: R.path }"
        >
          <component
            :is="R.icon"
            class="text-xl"
          />
          <span>{{ R.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="navbar">
        <span class="flex items-center gap-2">
          <i-material-symbols-menu class="text-xl" />
          <span class="font-bold text-lg">{{ $route.name }}</span>
        </span>
        <select-place />
        <el-button
          circle
          :icon="Right"
          type="primary"
          @click="SignUp"
        />
      </el-header>
      <el-main class="bg-[#E4E7ED] !p-0">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { Right } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import SelectPlace from './SelectPlace.vue'
const loginStore = useLoginStore()
const route = useRoute()
const router = useRouter()
console.log(route.meta)
const { data } = storeToRefs(loginStore)
const SignUp = () => router.replace('/')
</script>
<style scoped lang="scss">
.navbar {
  @apply flex justify-between items-center h-64px;
  border-bottom: 1px solid #bdbcbc;
}

.side {
  @apply w-0 md: w-1/6 font-bold bg-dark-100 text-white min-h-full;
}

.main-content {
  @apply h-full md: w-5/6;
}

:deep(.el-menu-item) {
  @apply gap-3 bg-dark-100 text-white;
}

.is-active {
  @apply bg-[#fff] text-[#333] border-solid border-r-5px border-r-green-600;
}
</style>