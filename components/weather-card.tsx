"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sun, Cloud, CloudRain, Snowflake, Wind, MapPin, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WeatherCardProps {
  weather: {
    condition: string
    temperature: number
    humidity: number
    windSpeed: number
    icon: string
  } | null
  location: string
  onLocationChange: (location: string) => void
  loading: boolean
}

export default function WeatherCard({ weather, location, onLocationChange, loading }: WeatherCardProps) {
  const [searchLocation, setSearchLocation] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchLocation.trim()) {
      onLocationChange(searchLocation)
      setSearchLocation("")
    }
  }

  // Update the weather icon backgrounds to match the new color scheme
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full"
          >
            <Sun className="h-16 w-16 text-yellow-500" />
          </motion.div>
        )
      case "cloudy":
        return (
          <motion.div
            animate={{ x: [0, 5, 0, -5, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full"
          >
            <Cloud className="h-16 w-16 text-blue-400" />
          </motion.div>
        )
      case "rainy":
        return (
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="bg-cyan-100 dark:bg-cyan-900/30 p-4 rounded-full"
          >
            <CloudRain className="h-16 w-16 text-cyan-500" />
          </motion.div>
        )
      case "snowy":
        return (
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-full"
          >
            <Snowflake className="h-16 w-16 text-indigo-400" />
          </motion.div>
        )
      case "windy":
        return (
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="bg-teal-100 dark:bg-teal-900/30 p-4 rounded-full"
          >
            <Wind className="h-16 w-16 text-teal-500" />
          </motion.div>
        )
      default:
        return (
          <div className="bg-slate-100 dark:bg-slate-800/30 p-4 rounded-full">
            <Cloud className="h-16 w-16 text-slate-400" />
          </div>
        )
    }
  }

  // Update the getWeatherGradient function to use more pleasing colors
  const getWeatherGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/30"
      case "cloudy":
        return "bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-900/40 dark:to-slate-800/30"
      case "rainy":
        return "bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/30"
      case "snowy":
        return "bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/30"
      case "windy":
        return "bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/40 dark:to-cyan-800/30"
      default:
        return "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/40 dark:to-slate-800/30"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card
        className={`h-full backdrop-blur-md border-none shadow-lg ${
          weather
            ? getWeatherGradient(weather.condition)
            : "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/40 dark:to-slate-800/30"
        }`}
      >
        <CardHeader>
          {/* Update the CardTitle to use a more pleasing gradient */}
          <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
            <MapPin className="h-5 w-5 text-violet-500" />
            Current Weather
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-300">{location}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 right-0 bottom-0 animate-ping rounded-full bg-sky-400 opacity-75"></div>
                <div className="absolute top-2 left-2 right-2 bottom-2 animate-pulse rounded-full bg-sky-500"></div>
              </div>
            </div>
          ) : weather ? (
            <div className="flex flex-col items-center">
              <div className="mb-4">{getWeatherIcon(weather.condition)}</div>
              <h3 className="text-xl font-semibold mb-1 capitalize text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
                {weather.condition}
              </h3>
              <div className="text-4xl font-bold mb-4 text-slate-700 dark:text-white">{weather.temperature}°C</div>

              <div className="grid grid-cols-2 gap-4 w-full text-sm">
                <div className="flex flex-col items-center p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                  <span className="text-slate-500 dark:text-slate-400">Humidity</span>
                  <span className="font-medium text-slate-700 dark:text-white">{weather.humidity}%</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                  <span className="text-slate-500 dark:text-slate-400">Wind</span>
                  <span className="font-medium text-slate-700 dark:text-white">{weather.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-40 text-slate-500">No weather data available</div>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="bg-white/70 dark:bg-slate-800/70"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onLocationChange("New York")}
                className="bg-white/70 hover:bg-sky-100 dark:bg-slate-800/70 dark:hover:bg-sky-900/50 border-sky-200 dark:border-sky-800"
              >
                New York
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onLocationChange("London")}
                className="bg-white/70 hover:bg-sky-100 dark:bg-slate-800/70 dark:hover:bg-sky-900/50 border-sky-200 dark:border-sky-800"
              >
                London
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onLocationChange("Tokyo")}
                className="bg-white/70 hover:bg-sky-100 dark:bg-slate-800/70 dark:hover:bg-sky-900/50 border-sky-200 dark:border-sky-800"
              >
                Tokyo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onLocationChange("Sydney")}
                className="bg-white/70 hover:bg-sky-100 dark:bg-slate-800/70 dark:hover:bg-sky-900/50 border-sky-200 dark:border-sky-800"
              >
                Sydney
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
