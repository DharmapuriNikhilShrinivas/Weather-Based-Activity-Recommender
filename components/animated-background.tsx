"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface AnimatedBackgroundProps {
  weatherCondition?: string
}

export default function AnimatedBackground({ weatherCondition = "default" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const isDark = theme === "dark"

    // Particle settings based on weather
    let particleSettings = {
      count: 100,
      size: { min: 1, max: 3 },
      speed: { min: 0.2, max: 0.8 },
      color: isDark ? "#ffffff" : "#4299e1",
      opacity: { min: 0.1, max: 0.5 },
    }

    // Update the particle colors based on weather
    switch (weatherCondition.toLowerCase()) {
      case "sunny":
        particleSettings = {
          count: 50,
          size: { min: 2, max: 5 },
          speed: { min: 0.1, max: 0.3 },
          color: isDark ? "#fbbf24" : "#f59e0b",
          opacity: { min: 0.2, max: 0.6 },
        }
        break
      case "rainy":
        particleSettings = {
          count: 200,
          size: { min: 1, max: 2 },
          speed: { min: 1, max: 3 },
          color: isDark ? "#22d3ee" : "#0ea5e9",
          opacity: { min: 0.3, max: 0.7 },
        }
        break
      case "snowy":
        particleSettings = {
          count: 150,
          size: { min: 2, max: 4 },
          speed: { min: 0.2, max: 0.6 },
          color: isDark ? "#a5b4fc" : "#818cf8",
          opacity: { min: 0.4, max: 0.8 },
        }
        break
      case "cloudy":
        particleSettings = {
          count: 80,
          size: { min: 2, max: 4 },
          speed: { min: 0.1, max: 0.4 },
          color: isDark ? "#60a5fa" : "#3b82f6",
          opacity: { min: 0.1, max: 0.3 },
        }
        break
      case "windy":
        particleSettings = {
          count: 120,
          size: { min: 1, max: 3 },
          speed: { min: 0.5, max: 2 },
          color: isDark ? "#2dd4bf" : "#14b8a6",
          opacity: { min: 0.1, max: 0.4 },
        }
        break
      default:
        particleSettings = {
          count: 100,
          size: { min: 1, max: 3 },
          speed: { min: 0.2, max: 0.8 },
          color: isDark ? "#a78bfa" : "#8b5cf6",
          opacity: { min: 0.1, max: 0.5 },
        }
    }

    // Create particles
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }[] = []

    for (let i = 0; i < particleSettings.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (particleSettings.size.max - particleSettings.size.min) + particleSettings.size.min,
        speedX:
          (Math.random() - 0.5) * (particleSettings.speed.max - particleSettings.speed.min) +
          particleSettings.speed.min,
        speedY:
          (Math.random() - 0.5) * (particleSettings.speed.max - particleSettings.speed.min) +
          particleSettings.speed.min,
        opacity:
          Math.random() * (particleSettings.opacity.max - particleSettings.opacity.min) + particleSettings.opacity.min,
      })
    }

    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle =
          particleSettings.color +
          Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      requestAnimationFrame(animate)
    }

    // Handle resize
    function handleResize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [weatherCondition, theme])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" aria-hidden="true" />
  )
}
