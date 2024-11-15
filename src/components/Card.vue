<template>
  <div class="card rounded-md">
    <div class="card-body">
      <div>
        <span>{{ title }}</span>
        <div class="font-bold text-4xl mt-4">
          {{ message }}<sub class="text-xs"> / 台</sub>
        </div>
      </div>
      <el-icon
        :size="40"
        :color="color"
      >
        <slot name="icon" />
      </el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string;
  message: string | number;
  color: string;
}>()
</script>
<style scoped lang="scss">
.card {
  @apply bg-[#fff] w-full border border-gray-100 cursor-pointer shadow-lg;

  &-body {
    @apply py-2 px-4 flex justify-between items-center font-bold;
  }

  &-footer {
    border-top: 1px solid;
    @apply border-gray-100;
  }
}
</style>