"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimatedThemeTogglerProps = {
  className?: string
  iconSize?: number
}

export const AnimatedThemeToggler = ({ className, iconSize = 20 }: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  )

  useEffect(() => {
    const syncTheme = () =>
      setDarkMode(document.documentElement.classList.contains("dark"))

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const onToggle = useCallback(async () => {
    if (!buttonRef.current) return

    const toggled = !darkMode
    setDarkMode(toggled)
    document.documentElement.classList.toggle("dark", toggled)
    localStorage.setItem("theme", toggled ? "dark" : "light")

    // Check if View Transition API is supported
    if (!document.startViewTransition) {
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        // Already toggled above
      })
    }).ready

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const maxDistance = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${centerX}px ${centerY}px)`,
          `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [darkMode])

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label="Switch theme"
      className={cn(
        "flex items-center justify-center p-2 rounded-full outline-none focus:outline-none active:outline-none focus:ring-0 cursor-pointer",
        className
      )}
      type="button"
      style={{
        background: darkMode ? '#fff' : '#000'
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <motion.span
            key="sun-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: 25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.33 }}
            style={{ color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Sun size={iconSize} />
          </motion.span>
        ) : (
          <motion.span
            key="moon-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.33 }}
            style={{ color: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Moon size={iconSize} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
