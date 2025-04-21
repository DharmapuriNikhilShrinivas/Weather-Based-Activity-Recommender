"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sun, Cloud, CloudRain, Snowflake, Wind } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import AnimatedBackground from "@/components/animated-background"
import { getOutdoorActivities } from "@/lib/weather-service"

export default function OutdoorPage() {
  const router = useRouter()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeWeather, setActiveWeather] = useState("sunny")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const outdoorActivities = await getOutdoorActivities()
        setActivities(outdoorActivities)
      } catch (error) {
        console.error("Error fetching outdoor activities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const weatherTypes = ["sunny", "cloudy", "rainy", "snowy", "windy"]

  const weatherIcons = {
    sunny: <Sun className="h-4 w-4 text-amber-500" />,
    cloudy: <Cloud className="h-4 w-4 text-slate-500" />,
    rainy: <CloudRain className="h-4 w-4 text-blue-500" />,
    snowy: <Snowflake className="h-4 w-4 text-sky-300" />,
    windy: <Wind className="h-4 w-4 text-slate-400" />,
  }

  const weatherGradients = {
    sunny: "from-yellow-500 to-amber-500",
    cloudy: "from-blue-500 to-indigo-500",
    rainy: "from-cyan-500 to-blue-500",
    snowy: "from-indigo-400 to-violet-500",
    windy: "from-teal-400 to-cyan-500",
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatedBackground weatherCondition={activeWeather} />
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="mb-8 text-center">
          <motion.h1
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Outdoor Activities
          </motion.h1>
          <motion.p
            className="text-slate-600 dark:text-slate-300 mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find the perfect outdoor activity for any weather condition
          </motion.p>
        </header>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 border-none shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                Find the Perfect Outdoor Activity
              </CardTitle>
              <CardDescription>Browse activities by weather condition</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sunny" onValueChange={(value) => setActiveWeather(value)}>
                <TabsList className="grid grid-cols-5 mb-4 p-1 bg-emerald-50 dark:bg-emerald-900/30">
                  {weatherTypes.map((type) => (
                    <TabsTrigger
                      key={type}
                      value={type}
                      className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:text-white"
                      style={{
                        backgroundImage: `linear-gradient(to right, var(--${type === activeWeather ? weatherGradients[type].replace(" to ", "), var(--") : "tw-white, var(--tw-white)"}))`,
                      }}
                    >
                      {weatherIcons[type]}
                      <span className="capitalize">{type}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {weatherTypes.map((type) => (
                  <TabsContent key={type} value={type}>
                    {loading ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <Card
                            key={i}
                            className="h-[180px] animate-pulse bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-none"
                          >
                            <CardHeader className="pb-2">
                              <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                            </CardHeader>
                            <CardContent>
                              <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                            </CardContent>
                            <CardFooter>
                              <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activities
                          .filter((activity) => activity.weatherType === type)
                          .map((activity, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              whileHover={{ y: -5, scale: 1.02 }}
                            >
                              <Card className="h-full border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/20">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">
                                    {activity.name}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-slate-600 dark:text-slate-300">{activity.description}</p>
                                </CardContent>
                                <CardFooter>
                                  <div className="flex items-center text-xs">
                                    <span className="px-2 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                                      {activity.difficulty}
                                    </span>
                                  </div>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-emerald-700 dark:text-emerald-300 mb-4">Looking for indoor activities instead?</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push("/indoor")}
              className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white border-none"
            >
              View Indoor Activities
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
