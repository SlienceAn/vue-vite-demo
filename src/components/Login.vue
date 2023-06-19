<template>
  <div class="w-full h-full flex justify-center items-start py-10">
    <form class="border border-gray-400 p-4 rounded-lg bg-gray-100 w-1/3">
      <h4 class="text-center font-bold text-2xl mb-2">Vue Demo</h4>
      <div class="mb-4">
        <label for="username" class="title-label">User Name</label>
        <input
          id="username"
          type="text"
          class="input focus:ring-blue-500 focus:border-blue-500"
          placeholder="User Name"
        />
      </div>
      <div class="mb-6">
        <label for="userpass" class="title-label">User Pass</label>
        <input
          id="userpass"
          type="text"
          class="input focus:ring-blue-500 focus:border-blue-500"
          placeholder="User Password"
        />
      </div>
      <div class="flex gap-3 justify-center">
        <button class="btn bg-blue-700 hover:bg-blue-900" @click="Submit">
          Submit
        </button>
        <button class="btn bg-red-700 hover:bg-red-900">Sign up</button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const Submit = () => router.push("/Main");
onMounted(() => console.log("onMounted"));
onUnmounted(() => console.log("uncss"));
</script>
<style scoped lang="scss">
</style>