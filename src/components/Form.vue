<template>
  <form class="flex px-[15px] py-[10px]">
    <div class="col">
      <label for="ID">設備ID</label>
      <input
        id="ID"
        v-model="data.id"
        type="text"
      >
    </div>
    <div class="col">
      <label for="postition">設備位置</label>
      <input
        id="position"
        v-model="data.location"
        type="text"
      >
    </div>
    <div class="col">
      <label for="user">巡檢人</label>
      <input
        id="user"
        v-model="data.user"
        type="text"
      >
    </div>
    <div class="col">
      <label for="inspect">巡檢日期</label>
      <el-date-picker
        id="inspect"
        value-format="YYYY-MM-DD"
      />
    </div>
  </form>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  id: '',
  location: '',
  user: '',
  date: ''
})
defineExpose({
  data
})
</script>
<style scoped lang="scss">
.col {
    min-width: 25%;
    display: flex;
    align-items: center;
    padding-right: 10px;

    & label {
        width: 30%;
        white-space: nowrap;
        font-weight: bolder;
    }

    & input {
        width: 70%;
        border: 1px solid #d3d3d3;
        border-radius: .25rem;
        padding: 5px;

        &:focus {
            outline: none;
        }
    }
}
</style>