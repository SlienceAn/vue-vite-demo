<template>
    <form class="flex px-[15px] py-[10px]">
        <div class="col">
            <label for="ID">設備ID</label>
            <input id="ID" type="text">
        </div>
        <div class="col">
            <label for="postition">設備位置</label>
            <input id="position" type="text">
        </div>
        <div class="col">
            <label for="user">巡檢人</label>
            <input id="user" type="text">
        </div>
        <div class="col">
            <label for="user">巡檢人</label>
            <input id="user" type="text">
        </div>
    </form>
</template>
<script setup lang="ts">
import { reactive } from "vue";

const data = reactive({})
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