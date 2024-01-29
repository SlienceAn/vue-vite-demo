<template>
  <div class="card">
    <div class="card-body p-4 flex justify-between items-center">
      <div>
        <h4>{{ title }}</h4>
        <div class="font-bold text-4xl">{{ message }}<sub class="text-xs"> / 台</sub> </div>
      </div>
      <el-icon :size="40" :color="color">
        <slot name="icon"></slot>
      </el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps<{
  title: string;
  message: string | number;
  color: string;
}>();
</script>
<style scoped lang="scss">
.card {
  background: #fff;
  box-shadow: 0 1px 20px 0 rgba(10, 166, 239, 0.08);
  @apply w-full border border-gray-400;

  &-footer {
    border-top: 1px solid;
    @apply border-gray-400;
  }
}
</style>