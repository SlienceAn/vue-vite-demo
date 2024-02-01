<template>
  <div class="w-full h-full flex justify-center items-start py-10">
    <form class="border border-gray-400 p-4 rounded-lg bg-gray-100 w-2/3 md:w-1/3">
      <h4 class="text-center font-bold text-2xl mb-2">Vue Demo Project</h4>
      <div class="mb-4">
        <label for="username" class="title-label">帳號</label>
        <input id="username" type="text" class="input focus:ring-blue-500 focus:border-blue-500" placeholder="User Name"
          v-model="account" />
      </div>
      <div class="mb-6">
        <label for="userpass" class="title-label">密碼</label>
        <input id="userpass" type="password" class="input focus:ring-blue-500 focus:border-blue-500"
          placeholder="User Password" v-model="password" />
      </div>
      <div class="flex gap-3 justify-center">
        <button class="px-10 btn bg-blue-700 hover:bg-blue-900" @click="login">
          <i-material-symbols-add />登入
        </button>
        <!-- <button class="btn bg-red-700 hover:bg-red-900">Sign up</button> -->
      </div>
    </form>
  </div>
</template>
<script setup lang="tsx">
const loginStore = useLoginStore()
const { account, password } = storeToRefs(loginStore)
const login = () => loginStore.postLogin()
</script>
