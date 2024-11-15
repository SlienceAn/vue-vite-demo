<template>
  <el-dropdown
    trigger="click"
    @command="handleSelect"
  >
    <div class="wrapper">
      <div />
      <span class="text-xl font-bold">{{ city }}</span>
      <el-icon>
        <ArrowDownBold />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="i in cityList"
          :key="i"
          :command="i"
        >
          {{ i }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
const globalStore = useGlobalStore()
const { cityList, city } = storeToRefs(globalStore)
const handleSelect = (key) => {
  globalStore.$patch({ city: key })
  globalStore.getDeviceStatusList()
}
onMounted(() => globalStore.getCity())
</script>
<style lang="scss" scoped>
.wrapper {
  @apply w-200px h-40px rounded-md flex items-center justify-between px-4 text-gray-700 border border-solid border-gray cursor-pointer;
}
</style>