<template>
  <div class="flex h-full">
    <div class="side">
      <div class="text-center">
        <el-icon :size="60" color="#fff">
          <SwitchFilled />
        </el-icon>
      </div>
      <ul>
        <li class="link">
          <router-link to="/Main/Demo-1">
            <el-icon :size="20"><Paperclip /></el-icon>
            <span>Demo-1</span>
          </router-link>
        </li>
        <li class="link">
          <router-link to="/Main/Demo-2">
            <el-icon :size="20"><Paperclip /></el-icon>
            <span>Demo-2</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-content">
      <!-- <nav class="w-full bg-gray-200">f</nav> -->
      <div class="p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.side {
  @apply w-1/6 bg-blue-900 min-h-full;
}
.main-content {
  @apply h-full w-5/6;
}
.link a {
  display: flex;
  align-items: center;
  @apply w-full text-white px-3 py-2 gap-3 hover:bg-light-200 hover:text-blue-900 hover:font-bold;
}
</style>