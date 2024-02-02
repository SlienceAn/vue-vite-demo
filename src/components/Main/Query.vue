<template>
    <div class="group">
        <span :class="`switch ${isSwtich ? 'switch-active' : ''}`" @click="isSwtich = true">設備查詢</span>
        <span :class="`switch ${!isSwtich ? 'switch-active' : ''}`" @click="isSwtich = false">事件查詢</span>
    </div>
    <div class="py-5">
        <component :is="searchCate" />
    </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
const isSwtich = ref(true)
//動態載入Components
//模組或組件多才考慮使用defineAsyncComponent
const searchCate = computed(() => isSwtich.value ?
    defineAsyncComponent(() => import('../EquipmentSearch.vue')) :
    defineAsyncComponent(() => import('../EventSearch.vue')))
</script>
<style scoped lang="scss">
$triangle-width: 13px;

.switch {
    position: relative;
    @apply inline-block px-4 py-2 bg-blue-600 text-white font-bold border-r;

    &:hover {
        @apply cursor-pointer bg-blue-800;
    }

    &:first-child {
        @apply rounded-tl-lg rounded-bl-lg;
    }

    &:last-child {
        @apply rounded-tr-lg rounded-br-lg border-0;
    }

    &-active {
        @apply bg-blue-900;

        &::before {
            content: "";
            position: absolute;
            bottom: -($triangle-width*1.75);
            left: calc(50% - $triangle-width);
            border-style: solid;
            border-width: $triangle-width*1.75 $triangle-width 0 $triangle-width;
            @apply w-0 h-0 border-l-transparent border-t-blue-900 border-r-transparent;
        }
    }
}
</style>