"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Coffee, BookOpen, Gamepad2, Film, Music } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import AnimatedBackground from "@/components/animated-background"
import { getIndoorActivities } from "@/lib/weather-service"

export default function IndoorPage() {
  const router = useRouter()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("relaxation")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const indoorActivities = await getIndoorActivities()
        setActivities(indoorActivities)
      } catch (error) {
        console.error("Error fetching indoor activities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const categories = ["relaxation", "learning", "entertainment", "creative", "social"]

  const categoryIcons = {
    relaxation: <Coffee className="h-4 w-4 text-amber-600" />,
    learning: <BookOpen className="h-4 w-4 text-emerald-600" />,
    entertainment: <Film className="h-4 w-4 text-purple-600" />,
    creative: <Music className="h-4 w-4 text-blue-600" />,
    social: <Gamepad2 className="h-4 w-4 text-pink-600" />,
  }

  const categoryGradients = {
    relaxation: "from-cyan-500 to-blue-500",
    learning: "from-teal-500 to-emerald-500",
    entertainment: "from-fuchsia-500 to-purple-500",
    creative: "from-blue-500 to-indigo-500",
    social: "from-rose-500 to-pink-500",
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatedBackground weatherCondition="rainy" />
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="mb-8 text-center">
          <motion.h1
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Indoor Activities
          </motion.h1>
          <motion.p
            className="text-slate-600 dark:text-slate-300 mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Perfect activities for rainy days or extreme weather
          </motion.p>
        </header>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 border-none shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">
                Discover Indoor Activities
              </CardTitle>
              <CardDescription>Find activities by category</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="relaxation" onValueChange={(value) => setActiveCategory(value)}>
                <TabsList className="grid grid-cols-5 mb-4 p-1 bg-amber-50 dark:bg-amber-900/30">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:text-white"
                      style={{
                        backgroundImage: `linear-gradient(to right, var(--${category === activeCategory ? categoryGradients[category].replace(" to ", "), var(--") : "tw-white, var(--tw-white)"}))`,
                      }}
                    >
                      {categoryIcons[category]}
                      <span className="capitalize hidden sm:inline">{category}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((category) => (
                  <TabsContent key={category} value={category}>
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
                          .filter((activity) => activity.category === category)
                          .map((activity, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              whileHover={{ y: -5, scale: 1.02 }}
                            >
                              <Card className="h-full border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
                                    {activity.name}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-slate-600 dark:text-slate-300">{activity.description}</p>
                                </CardContent>
                                <CardFooter>
                                  <div className="flex items-center text-xs">
                                    <span className="px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                                      {activity.mood}
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
          <p className="text-amber-700 dark:text-amber-300 mb-4">Want to explore outdoor activities?</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push("/outdoor")}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white border-none"
            >
              View Outdoor Activities
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
