import type { DirectiveBinding } from 'vue'
import { dayjs } from 'element-plus'
// 經緯度數字轉換為WGS表達
const coordinateWGS = (decimal: number, type: any): string => {
  if (typeof decimal !== 'number' || isNaN(decimal)) {
    console.error('傳入值必須是數字')
  }
  let direction = ''
  // 取得絕對值
  const absoluteValue = Math.abs(decimal)
  // 取後6位小數
  const formattedValue = absoluteValue.toFixed(6)
  if (type.lat && absoluteValue > 90) {
    throw new Error('Latitude must be between -90 and 90 degrees')
  }
  if (type.lon && absoluteValue > 180) {
    throw new Error('Longitude must be between -180 and 180 degrees')
  }
  type.lat && decimal >= 0 ? direction = 'N' : direction = 'S'
  type.lon && decimal >= 0 ? direction = 'E' : 'W'
  return `${direction} ${formattedValue}°`
}
// 僅需要 mounted 和 updated，可以直接用一個函數來定義
const wgs = (el: HTMLElement, binding: DirectiveBinding) => {
  el.textContent = coordinateWGS(binding.value, binding.modifiers)
}
// 轉換累積天數
const accumulation = (el: HTMLElement, binding: DirectiveBinding) => {
  const now = dayjs().format('YYYY-MM-DD HH:mm')
  const diff= dayjs(now).diff(binding.value, 'day')
  el.textContent = diff+' 天'
}
export default {
  wgs,
  accumulation
}

// 不建議在組件上使用自定義指令

// 原始版本
// const wgs: Directive = {
//   mounted: (el: HTMLElement, binding: DirectiveBinding) => {
//     el.textContent = coordinateWGS(binding.value, binding.modifiers)
//   }
// }

