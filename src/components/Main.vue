<template>
  <div class="flex flex-col md:flex-row bg-[#f3f3f3] min-h-full">
    <div class="side">
      <div class="text-center hidden p-4 md:block border-b border-gray-500">
        <el-icon size="40" color="#fff">
          <Avatar />
        </el-icon>
        <div class="text-white">Hi，{{ userName }}</div>
      </div>
      <ul class="flex md:flex-col md:py-4">
        <li class="link" v-for="R in routeList" :key="R.name">
          <router-link :to="R.path">
            <el-icon :size="20">
              <Paperclip />
            </el-icon>
            <span>{{ R.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-content px-4 py-2">
      <nav class="navbar">
        <h4 class="font-bold text-xl">{{ route.name }}</h4>
        <el-button type="danger" @click="() => router.push('/')">登出</el-button>
      </nav>
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCounter } from '../store'
const route = useRoute()
const router = useRouter()
const store = useCounter()
let routeList = reactive<any>([])
let userName = ref("")
routeList = store.item
userName.value = store.userName
</script>
<style scoped lang="scss">
$side-color: #130e76;

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  @apply w-full mb-4 py-2
}

.side {
  background-color: $side-color;
  width: 100%;
  @apply md: w-1/6 min-h-full;
}

.main-content {
  @apply h-full md: w-5/6;
}

.link a {
  display: flex;
  align-items: center;
  @apply w-full text-white p-3 gap-5 hover: bg-[#f3f3f3] hover:text-blue-900 hover:font-bold;
}
</style>