<template>
  <div
    ref="pixiContainer"
    class="pixiContainer"
  />
</template>
<script setup lang="tsx">
import { Application, Graphics, Container, Sprite, Assets } from 'pixi.js'
const pixiContainer = ref<HTMLElement>()

// 定義網格單元格的大小（像素）
const cellSize = ref(30)

// 創建PIXI應用和網格的全局引用
let app: Application | null = null
let grid: Graphics | null = null
let mainContainer: Container | null = null

// 創建網格的函數
const buildGrid = (graphics: Graphics, width: number, height: number): Graphics => {
  graphics.clear()
  graphics.eventMode = 'static'
  graphics.cursor = 'pointer'
  // 繪製垂直線
  for (let x = 0; x <= width; x += cellSize.value) {
    graphics
      .moveTo(x, 0)
      .lineTo(x, height)
  }
  // 繪製水平線
  for (let y = 0; y <= height; y += cellSize.value) {
    graphics
      .moveTo(0, y)
      .lineTo(width, y)
  }
  return graphics
}
// 創建主container
const buildMainContainer = (container: Container): Container => {
  if (!app || !pixiContainer.value) return new Container()

  // 清空現有容器
  container.removeChildren()

  const sprite = Sprite.from('/test.png')
  sprite.width = 200
  sprite.height = 200

  // 舊版語法（可以正常顯示）
  // const testGraphics = new Graphics()
  //   .beginFill(0xf0f0f0)
  //   .drawRect(0, 0, pixiContainer.value.clientWidth * 0.6, pixiContainer.value.clientHeight * 0.8)
  //   .endFill()

  // container.addChild(testGraphics)
  container.addChild(sprite)
  const centerX = app.screen.width / 2
  const centerY = app.screen.height / 2
  const { width, height } = container.getBounds()
  container.x = centerX - width / 2
  container.y = centerY - height / 2
  return container
}
// 處理視窗大小改變的函數
const handleResize = () => {
  if (!app || !pixiContainer.value || !grid || !mainContainer) return
  const width = pixiContainer.value?.clientWidth
  const height = pixiContainer.value?.clientHeight
  app.renderer.resize(width, height)
  buildGrid(grid, width, height).stroke({ color: 0xE6E6E6, width: 1, alpha: 1 })
  buildMainContainer(mainContainer)
}
// 初始化 PIXI
const initPixi = async () => {
  if (!pixiContainer.value) return
  const width = pixiContainer.value?.clientWidth
  const height = pixiContainer.value?.clientHeight
  app = new Application()

  // 創建PIXI應用實例
  await app.init({
    width,
    height,
    backgroundColor: 0xffffff,
    resolution: window.devicePixelRatio || 1, // 設置解析度
    autoDensity: true,  // 啟用自動密度調整
    eventMode: 'static'
  })

  pixiContainer.value.appendChild(app.canvas)

  // 創建網格
  grid = buildGrid(new Graphics(), width, height).stroke({ color: 0xE6E6E6, width: 1, alpha: 1 })
  mainContainer = buildMainContainer(new Container())

  console.log('main container', mainContainer)

  app.stage.addChild(grid)
  app.stage.addChild(mainContainer)

  window.addEventListener('resize', handleResize)
}

onMounted(() => initPixi())

// 組件卸載前清理
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (app) {
    app.destroy(true)
    app = null
    grid = null
    mainContainer = null
  }
})

</script>
<style lang="scss" scoped>
.pixiContainer {
  @apply h-full w-full overflow-hidden;
}
</style>