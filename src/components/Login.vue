<template>
  <div class="w-full h-full flex justify-center items-start py-10">
    <form class="border border-gray-400 p-4 rounded-lg bg-gray-100 w-2/3 md:w-1/3">
      <h4 class="text-center font-bold text-2xl mb-2">Vue Demo Project</h4>
      <div class="mb-4">
        <label for="username" class="title-label">帳號</label>
        <input id="username" type="text" class="input focus:ring-blue-500 focus:border-blue-500" placeholder="User Name"
          v-model="user.account" />
      </div>
      <div class="mb-6">
        <label for="userpass" class="title-label">密碼</label>
        <input id="userpass" type="password" class="input focus:ring-blue-500 focus:border-blue-500"
          placeholder="User Password" v-model="user.password" />
      </div>
      <div class="flex gap-3 justify-center">
        <button class="px-10 btn bg-blue-700 hover:bg-blue-900" @click="login">
          登入
        </button>
        <!-- <button class="btn bg-red-700 hover:bg-red-900">Sign up</button> -->
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
//response type
type response = {
  success: boolean,
  userName: string,
  message: string,
  data: any
}
import { reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useCounter } from "../store"

const app = getCurrentInstance()?.appContext.config.globalProperties;
const router = useRouter()
const store = useCounter()
const user = reactive({
  account: "rd",
  password: "123"
})
const login = () => {
  console.log("WWW")
  app?.$axios('/login', { method: "POST", data: user }).then((res: any) => {
    const data: response = res.data
    if (data.success) {
      store.$patch({
        userName: data.userName,
        item: data.data,
      })
      console.log("test")
      router.push("/Main/Information")
    } else {
      alert("帳號密碼錯誤")
    }
  })
}
</script>
<style scoped lang="scss"></style>