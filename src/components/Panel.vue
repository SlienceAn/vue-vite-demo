<template>
  <div class="panel">
    <div class="panel-header p-1 text-center">
      <span class="font-bold text-2xl">{{ header }}</span>
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ header?: string }>()
</script>
<style scoped lang="scss">
.panel {
  background: #fff;
  @apply w-full border border-gray-400;
}
</style>