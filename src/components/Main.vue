<template>
  <div class="flex flex-col md:flex-row bg-[#f3f3f3] min-h-full">
    <div class="side">
      <div class="h-64px border-b border-gray-500">
      </div>
      <el-scrollbar class="h-[calc(100%-64px)]">
        <ul class="flex md:flex-col md:py-4 h-[calc(100%-64px)]">
          <li class="link" v-for="R in loginStore.data" :key="R.name">
            <router-link :to="R.path">
              <component :is='R.icon'/>
              <span>{{ R.name }}</span>
            </router-link>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="main-content px-4">
      <el-header class="navbar !pl-0">
        <span class="font-bold text-lg border">{{ }}</span>
      </el-header>
      <el-main class="!px-0">
        <router-view />
      </el-main>
    </div>
  </div>
</template>
<script setup lang="ts">
const loginStore = useLoginStore()
const { data } = storeToRefs(loginStore)
console.log(loginStore)
console.log(data.value)
</script>
<style scoped lang="scss">
$side-color: #130e76;

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid #000;
}

.side {
  background-color: $side-color;
  width: 100%;
  @apply md: w-1/6 min-h-full;
}

.main-content {
  @apply h-full md: w-5/6;
}

.link a {
  display: flex;
  align-items: center;
  @apply w-full text-white p-3 gap-5 hover: bg-[#f3f3f3] hover:text-blue-900 hover:font-bold;
}
</style>