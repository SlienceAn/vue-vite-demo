<template>
  <div class="card rounded-md">
    <div class="card-body">
      <el-icon
        :size="40"
        :color="color"
      >
        <slot name="icon" />
      </el-icon>
      <div>
        <span>{{ title }}</span>
        <el-statistic :value="val">
          <template #suffix>
            <sub class="text-xs font-700 leading-5"> / 台</sub>
          </template>
        </el-statistic>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTransition } from '@vueuse/core'
const props = defineProps<{
  title: string;
  message: number;
  color: string;
}>()
const num = ref(0)
const val = useTransition(num, {
  duration: 1000
})
num.value = props.message
</script>
<style scoped lang="scss">
.card {
  @apply bg-[#fff] w-full un-border;

  &-body {
    @apply py-2 px-4 flex justify-between items-center font-bold;
  }

  &-footer {
    border-top: 1px solid;
    @apply border-gray-100;
  }
}

:deep(.el-statistic__content) {
  @apply flex items-end justify-end ;
}
</style>