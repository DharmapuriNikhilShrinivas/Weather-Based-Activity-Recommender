"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import WeatherCard from "@/components/weather-card"
import ActivityGrid from "@/components/activity-grid"
import AnimatedBackground from "@/components/animated-background"
import { getWeatherData, getActivities } from "@/lib/weather-service"

export default function HomePage() {
  const router = useRouter()
  const [weather, setWeather] = useState(null)
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState("New York")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const weatherData = await getWeatherData(location)
        setWeather(weatherData)

        const recommendedActivities = await getActivities(weatherData.condition)
        setActivities(recommendedActivities)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [location])

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatedBackground weatherCondition={weather?.condition || "default"} />
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="mb-8 text-center">
          <motion.h1
            className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Weather Activity Recommender
          </motion.h1>
          <motion.p
            className="text-slate-600 dark:text-slate-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover the perfect activities based on your local weather!
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <WeatherCard weather={weather} location={location} onLocationChange={setLocation} loading={loading} />
          </div>

          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full backdrop-blur-md bg-white/70 dark:bg-slate-800/70 border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
                    Recommended Activities
                  </CardTitle>
                  <CardDescription>Based on current weather conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActivityGrid activities={activities} loading={loading} />
                </CardContent>
                <CardFooter>
                  <div className="w-full flex flex-col sm:flex-row justify-center gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => router.push("/outdoor")}
                        className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white border-none"
                      >
                        Outdoor Activities
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => router.push("/indoor")}
                        className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white border-none"
                      >
                        Indoor Activities
                      </Button>
                    </motion.div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
