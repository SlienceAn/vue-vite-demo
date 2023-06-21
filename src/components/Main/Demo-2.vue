<template>
    <form class="flex gap-2 items-end">
        <div>
            <label for="Area" class="title-label">Area</label>
            <input id="Area" type="text" class="input" placeholder="area">
        </div>
        <div>
            <label for="ID" class="title-label">ID</label>
            <input id="ID" type="text" class="input" placeholder="id">
        </div>
        <button class="btn bg-blue-800 flex justify-center gap-2 items-center hover:bg-blue-900">
            <el-icon :size="15">
                <Search />
            </el-icon>
            <span>Search</span>
        </button>
    </form>
    <Modal></Modal>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss"></style>