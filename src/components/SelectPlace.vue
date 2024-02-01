<template>
    <el-dropdown>
        <div class="wrapper flex items-center justify-between px-4 text-gray-700">
            <div />
            <span class="text-xl font-bold">縣市</span>
            <el-icon>
                <ArrowDownBold />
            </el-icon>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.wrapper {
    @apply w-200px h-40px border rounded-md border-gray-300;
}
</style>