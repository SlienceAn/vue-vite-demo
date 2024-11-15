<template>
  <el-config-provider :button="config">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
// import { useWindowSize } from '@vueuse/core'
const config = reactive({
  autoInsertSpace: true,
})
// const { width, height } = useWindowSize()

</script>
<style>
body {
  @apply m-0 p-0 w-full min-h-screen;

  @apply font-["Microsoft_JhengHei"];
}

#app {
  @apply h-screen;
}
</style>
