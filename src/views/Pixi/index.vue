<template>
  <div
    ref="pixiContainer"
    class="pixiContainer"
  />
</template>
<script setup lang="tsx">
import { Application, Graphics, Sprite, Assets, Text } from 'pixi.js'
const pixiContainer = ref<HTMLElement>()

// 定義網格單元格的大小（像素）
const cellSize = ref(30)

// 創建PIXI應用和網格的全局引用
let app: Application | null = null
let grid: Graphics | null = null

// 創建拖曳點
const createDot = (text: string) => {
  let isDragging = false
  const dot = new Graphics()
  dot.interactive = true

  const dotText = new Text(text, {
    fontFamily: ['Helvetica', 'Arial', 'sans-serif'],
    fontSize: 48,
    fontWeight: '700',
    fill: 'white'
  })
  const positionText = new Text('', {
    fontFamily: ['Helvetica', 'Arial', 'sans-serif'],
    fontSize: 36,
    fontWeight: '400',
  })

  dotText.anchor.set(0.5)
  positionText.anchor.set(0.5)
  positionText.x = 0
  positionText.y = -75

  dot
    .circle(0, 0, 35)
    .fill(0xff0000)
  dot
    .on('pointerdown', () => {
      isDragging = true
      positionText.visible = true
    })
    .on('pointermove', (event) => {
      if (isDragging) {
        const newPosition = event.data.getLocalPosition(dot.parent)
        const { x, y } = newPosition
        dot.x = x
        dot.y = y
        positionText.text = `x ${Math.floor(dot.x)},y ${Math.floor(dot.y)}`
      }
    })
    .on('pointerup', () => {
      isDragging = false
      positionText.visible = false
    })
  dot.addChild(dotText)
  dot.addChild(positionText)
  return dot
}

// 繪製平面圖
const drawPlace = async () => {

  const place = await Assets.load('/placeImg2.webp')
  const sprite = Sprite.from(place)

  sprite.interactive = true
  sprite.scale.set(0.3)
  sprite.anchor.set(0.5)
  sprite.x = app!.screen.width / 2
  sprite.y = app!.screen.height / 2
  console.log(sprite.width, sprite.height)

  for (let i = 0; i < 5; i++) {
    // 新增可拖曳圓點
    sprite.addChild(createDot((i + 1).toString()))
  }
  return sprite
}

// 創建網格的函數
const drawGrid = (graphics: Graphics, width: number, height: number): Graphics => {
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

// 處理視窗大小改變的函數
const handleResize = () => {
  if (!app || !pixiContainer.value || !grid) return
  const width = pixiContainer.value?.clientWidth
  const height = pixiContainer.value?.clientHeight
  app.renderer.resize(width, height)
  drawGrid(grid, width, height).stroke({ color: 0xE6E6E6, width: 1, alpha: 1 })
  drawPlace()
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
    eventMode: 'static',
  })

  pixiContainer.value.appendChild(app.canvas)

  // 創建網格
  grid = drawGrid(new Graphics(), width, height).stroke({ color: 0xE6E6E6, width: 1, alpha: 1 })
  grid.zIndex = -1
  app.stage.addChild(await drawPlace())
  app.stage.addChild(grid)
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
  }
})

</script>
<style lang="scss" scoped>
.pixiContainer {
  @apply h-full w-full overflow-hidden;
}
</style>