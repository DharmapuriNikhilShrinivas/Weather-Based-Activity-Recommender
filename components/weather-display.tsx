"use client"

import { Sun, Cloud, CloudRain, Snowflake, Wind } from "lucide-react"
import { motion } from "framer-motion"

interface WeatherDisplayProps {
  weather: {
    condition: string
    temperature: number
    humidity: number
    windSpeed: number
    icon: string
  } | null
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  if (!weather) {
    return <div>No weather data available</div>
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Sun className="h-16 w-16 text-amber-500" />
          </motion.div>
        )
      case "cloudy":
        return (
          <motion.div
            animate={{ x: [0, 5, 0, -5, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Cloud className="h-16 w-16 text-slate-400" />
          </motion.div>
        )
      case "rainy":
        return (
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <CloudRain className="h-16 w-16 text-blue-500" />
          </motion.div>
        )
      case "snowy":
        return (
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Snowflake className="h-16 w-16 text-sky-300" />
          </motion.div>
        )
      case "windy":
        return (
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Wind className="h-16 w-16 text-slate-500" />
          </motion.div>
        )
      default:
        return <Cloud className="h-16 w-16 text-slate-400" />
    }
  }

  const getBackgroundColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "bg-amber-100 dark:bg-amber-900/30"
      case "cloudy":
        return "bg-slate-100 dark:bg-slate-900/30"
      case "rainy":
        return "bg-blue-100 dark:bg-blue-900/30"
      case "snowy":
        return "bg-sky-100 dark:bg-sky-900/30"
      case "windy":
        return "bg-slate-100 dark:bg-slate-900/30"
      default:
        return "bg-slate-100 dark:bg-slate-900/30"
    }
  }

  return (
    <div className={`rounded-lg p-4 ${getBackgroundColor(weather.condition)}`}>
      <div className="flex flex-col items-center">
        <div className="mb-4">{getWeatherIcon(weather.condition)}</div>
        <h3 className="text-xl font-semibold mb-1 capitalize">{weather.condition}</h3>
        <div className="text-3xl font-bold mb-4">{weather.temperature}°C</div>

        <div className="grid grid-cols-2 gap-4 w-full text-sm">
          <div className="flex flex-col items-center">
            <span className="text-slate-500 dark:text-slate-400">Humidity</span>
            <span className="font-medium">{weather.humidity}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-slate-500 dark:text-slate-400">Wind</span>
            <span className="font-medium">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  )
}
