<template>
    <el-button-group>
        <el-button icon="search" type="primary">ID查詢</el-button>
        <el-button icon="search" type="primary">事件查詢</el-button>
    </el-button-group>
    {{ queryCate }}
    <component :is="test" />
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'

//動態載入Components
const queryCate = ref('ID')
const test = computed(() => defineAsyncComponent(() => import("../EventSearch.vue")))
</script>
<style scoped lang="scss"></style>