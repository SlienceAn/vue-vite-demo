<template>
  <div>Inspection</div>
  <div>{{ city }}</div>
</template>
<script setup lang="ts">
const globalStore = useGlobalStore()
const { city } = storeToRefs(globalStore)
</script>
<style scoped lang="scss"></style>