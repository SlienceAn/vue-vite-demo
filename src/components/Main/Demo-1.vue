<template>
  <h4 class="font-bold text-lg mb-2">{{ route.name }}</h4>
  <div class="flex gap-4">
    <Card
      v-for="i in arr"
      :key="i"
      :title="i.title"
      :message="i.message"
      :color="i.color"
    >
      <component :is="i.icon" />
    </Card>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import Card from "@components/Card.vue";
import Edit from "element-plus";
import { ref } from "vue";
const router = useRouter();
const route = useRoute();
console.log("route name => ", route.name);
const arr = [
  {
    title: "總機台數量",
    message: "846",
    icon: "InfoFilled",
    color: "blue",
  },
  {
    title: "已連線",
    message: "233",
    icon: "SuccessFilled",
    color: "green",
  },
  {
    title: "連線異常",
    message: "90",
    icon: "WarningFilled",
    color: "orange",
  },
  {
    title: "已斷線",
    message: "409",
    icon: "CircleCloseFilled",
    color: "red",
  },
];
</script>
<style scoped lang="scss">
</style>