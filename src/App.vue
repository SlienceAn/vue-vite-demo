<template>
  <el-config-provider :button="config">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
const config = reactive({
  autoInsertSpace: true,
})
</script>
<style>
html,
body {
  height: 100%;
}
#app {
  height: 100vh;
}
</style>
