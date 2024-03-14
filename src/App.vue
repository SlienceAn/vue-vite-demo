<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
console.log('AAA')
console.log('BBB')
console.log('CCC')
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
