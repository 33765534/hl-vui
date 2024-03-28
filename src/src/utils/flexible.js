import { computed } from "vue"
import { useWindowSize } from "@vueuse/core"
import { PC_DEVICE_WIDTH } from "@/constants"

const { width } = useWindowSize()
/**
 * 判断是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * 动态指定 rem 基准值，最大为40px
 * 根据用户的屏幕宽度，进行一些计算，把计算出来的值赋值给html根标签作为fontsize大小
 */
export const useREM = () => {
  const MAX_FONT_SIZE = 40
  // 监听 html 文档被解析完成的事件
  document.addEventListener("DOMContentLoaded", () => {
    // 拿到html 标签
    const html = document.querySelector("html")
    // 计算fontSize,根据屏幕宽度 / 10
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    // 赋值给 html
    html.style.fontSize = fontSize + "px"
  })
}
