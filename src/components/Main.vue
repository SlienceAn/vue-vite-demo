<template>
  <div class="flex flex-col md:flex-row bg-[#f3f3f3] min-h-full">
    <div class="side">
      <div class="text-center hidden p-4 md:block">
        <el-icon :size="60" color="#fff">
          <HelpFilled />
        </el-icon>
      </div>
      <ul class="flex md:flex-col">
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
        {{ route.name }}
        <el-button type="danger" @click="() => router.push('/')">Sign Out</el-button>
      </nav>
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const routeList = reactive([
  {
    path: "/Main/Demo-1",
    name: "Demo-1"
  },
  {
    path: "/Main/Demo-2",
    name: "Demo-2"
  },
  {
    path: "/Main/Demo-3",
    name: "Demo-3"
  }
])
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
  @apply w-full text-white p-3 gap-2 hover: bg-[#f3f3f3] hover:text-blue-900 hover:font-bold;
}
</style>