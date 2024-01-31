<template>
  <el-container class="h-full">
    <el-aside class="side">
      <div class="h-64px items-center flex gap-2 px-4 border-solid border-b-1px">
        <i-material-symbols-onsen class="text-4xl text-green-700"/>
        <span>Vue3-Demo</span>
      </div>
      <el-menu router>
        <el-menu-item v-for="R in data.data" :key="R.name" :index="R.path">
          <component :is='R.icon' class="text-xl" />
          <span>{{ R.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="navbar">
        <span class="font-bold text-lg">{{ $route.name }}</span>
        <el-button circle :icon="Right" type="primary" @click="SignUp" />
      </el-header>
      <el-main class="bg-[#E4E7ED]">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { Right } from '@element-plus/icons-vue'
import router from '../router';
const loginStore = useLoginStore()
const { data } = storeToRefs(loginStore)
const SignUp = () => router.replace('/')
</script>
<style scoped lang="scss">
.navbar {
  @apply flex justify-between items-center h-64px;
  border-bottom: 1px solid #bdbcbc;
}
.side {
  @apply w-full md: w-1/6 font-bold bg-white  min-h-full border-solid border-r-1px border-r-[#E4E7ED];
}

.main-content {
  @apply h-full md: w-5/6;
}
:deep(.el-menu-item){
  @apply gap-3;
}
.is-active{
  @apply bg-[#ECF5FF] text-[#409EFF] border-solid border-r-4px border-r-[#409EFF];
}
</style>