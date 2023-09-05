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
    <!-- <div class="card-footer p-2 gap-2 flex justify-center items-center hover:cursor-pointer">
      <span class="text-sm">Google Map</span>
      <el-icon color="red" size="20">
        <LocationFilled />
      </el-icon>
    </div> -->
  </div>
  <el-dialog v-model="dialogToggle" :title="title" width="70%" top="2vh">
    <slot name="map" />
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  title: string;
  message: string | number;
  color: string;
}>();
const dialogToggle = ref(false)
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