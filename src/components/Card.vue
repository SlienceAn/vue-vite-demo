<template>
  <div class="card rounded-md">
    <div class="card-body py-2 px-4 flex justify-between items-center">
      <div>
        <span>{{ title }}</span>
        <div class="font-bold text-4xl mt-4">{{ message }}<sub class="text-xs"> / 台</sub> </div>
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
  @apply w-full border border-gray-100 hover:cursor-pointer hover:border hover:border-solid hover:border-gray-400;

  &-footer {
    border-top: 1px solid;
    @apply border-gray-100;
  }
}
</style>