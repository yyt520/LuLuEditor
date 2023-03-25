import { useThemeMode } from "core-react/hooks/useThemeMode"
import { useLayoutEffect } from "react"

export const Scroller = () => {
  const themeMode = useThemeMode()

  useLayoutEffect(() => {
    const styleNode = document.createElement("style")
    styleNode.innerHTML = `
    ::-webkit-scrollbar-thumb {
      border-radius: 0.2rem;
      background: ${themeMode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"};
      transition: all .2s;
    }
    `
    document.getElementsByTagName('head')[0]?.appendChild(styleNode)
    return () => {
      styleNode.remove()
    }
  }, [themeMode])

  return null
}