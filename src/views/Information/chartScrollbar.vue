<template>
  <el-scrollbar
    ref="scrollbarRef"
    @scroll="scrollEvent"
  >
    <slot />
  </el-scrollbar>
</template>
<script setup lang="tsx">
import { ScrollbarInstance } from 'element-plus'
const scrollbarRef = ref<null | ScrollbarInstance>(null)
let isScrolling = false
let lastScrollPosition = 0
let scrollTimeout: ReturnType<typeof setTimeout>
// bug ... 待優化
const scrollEvent = () => {
  if (isScrolling) {
    clearTimeout(scrollTimeout)
  }
  if(isScrolling) return

  const wrapRef = scrollbarRef.value?.wrapRef

  if (!wrapRef) return
  // 可視區域高度
  const containerHeight = wrapRef.clientHeight || 0
  // 當前滾動距離
  const currentScrollTop = wrapRef.scrollTop || 0
  // 判斷滾動上下
  const scrollingDown = currentScrollTop > lastScrollPosition
  // 滾動距離
  const distance = containerHeight / 2

  scrollbarRef.value?.scrollTo({
    top: currentScrollTop + (scrollingDown ? distance : -distance),
  })

  // 更新狀態
  isScrolling = true
  lastScrollPosition = currentScrollTop
  scrollTimeout = setTimeout(() => isScrolling = false, 150)
}
</script>