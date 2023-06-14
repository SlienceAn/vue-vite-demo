<script setup lang="ts">
import { ref } from "vue";
defineProps<{ msg: string; demo: string; vsc: string }>();
const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ demo }}</h1>
  <h1>{{ vsc }}</h1>
  <button class="btn btn-green">觸發</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
