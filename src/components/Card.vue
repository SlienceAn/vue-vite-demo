<template>
  <div class="card">
    <div class="card-body p-4 flex justify-between items-center">
      <div>
        <h4>{{ title }}</h4>
        <div class="font-bold text-4xl">{{ message }}</div>
      </div>
      <el-icon :size="40" :color="color">
        <slot></slot>
      </el-icon>
    </div>
    <div class="card-footer p-2 text-right">footer</div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string;
  message: string;
  color: string;
}>();
</script>
<style scoped lang="scss">
.card {
  @apply w-full border border-gray-400 rounded-lg;

  &-footer {
    border-top: 1px solid;
    @apply border-gray-400;
  }
}
</style>