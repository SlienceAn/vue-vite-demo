<template>
  <div class="flex flex-col md:flex-row bg-[#f3f3f3] min-h-full">
    <div class="side">
      <div class="text-center hidden p-4 md:block">
        <el-icon :size="60" color="#fff">
          <HelpFilled />
        </el-icon>
      </div>
      <ul class="flex">
        <li class="link">
          <router-link to="/Main/Demo-1">
            <el-icon :size="20">
              <Paperclip />
            </el-icon>
            <span>Demo-1</span>
          </router-link>
        </li>
        <li class="link">
          <router-link to="/Main/Demo-2">
            <el-icon :size="20">
              <Paperclip />
            </el-icon>
            <span>Demo-2</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-content px-4 py-2">
      <nav class="navbar">
        {{ route.name }}
        <el-button type="danger" @click="() => router.push('/')">Sign Out</el-button>
      </nav>
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
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
  // @apply w-1/6 min-h-full md:w-full;
}

.main-content {
  @apply h-full w-5/6;
}

.link a {
  display: flex;
  align-items: center;
  @apply w-full text-white p-3 gap-2 hover: bg-[#f3f3f3] hover:text-blue-900 hover:font-bold;
}
</style>