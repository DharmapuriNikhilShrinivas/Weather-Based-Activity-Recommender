"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Sun, Cloud, CloudRain, Snowflake, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import AnimatedBackground from "@/components/animated-background"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("popular")

  const popularDestinations = [
    {
      name: "Bali, Indonesia",
      description: "Tropical paradise with beaches, temples, and lush landscapes",
      weather: "sunny",
      activities: ["Surfing", "Temple visits", "Beach relaxation"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Kyoto, Japan",
      description: "Historic city with beautiful temples, gardens, and traditional culture",
      weather: "cloudy",
      activities: ["Temple tours", "Garden visits", "Tea ceremonies"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Swiss Alps",
      description: "Stunning mountain range with world-class skiing and hiking",
      weather: "snowy",
      activities: ["Skiing", "Snowboarding", "Mountain hiking"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Costa Rica",
      description: "Rainforest adventures, wildlife, and beautiful beaches",
      weather: "rainy",
      activities: ["Rainforest tours", "Wildlife watching", "Surfing"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Chicago, USA",
      description: "Vibrant city known for architecture, food, and culture",
      weather: "windy",
      activities: ["Architecture tours", "Museums", "Food exploration"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Barcelona, Spain",
      description: "Artistic city with stunning architecture and beaches",
      weather: "sunny",
      activities: ["Gaudi tours", "Beach visits", "Tapas tasting"],
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const getWeatherIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
      case "sunny":
        return <Sun className="h-5 w-5 text-amber-500" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-slate-500" />
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "snowy":
        return <Snowflake className="h-5 w-5 text-sky-300" />
      case "windy":
        return <Wind className="h-5 w-5 text-slate-500" />
      default:
        return <Sun className="h-5 w-5 text-amber-500" />
    }
  }

  const filteredDestinations = popularDestinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.activities.some((activity) => activity.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatedBackground weatherCondition="default" />
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="mb-8 text-center">
          <motion.h1
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500 dark:from-fuchsia-400 dark:to-pink-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Explore Destinations
          </motion.h1>
          <motion.p
            className="text-slate-600 dark:text-slate-300 mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover amazing places and activities around the world
          </motion.p>
        </header>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400">
                Find Your Next Adventure
              </CardTitle>
              <CardDescription>Search for destinations or activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search destinations, activities, or weather..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 dark:bg-slate-900/80"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="popular" onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start mb-6 bg-white/50 dark:bg-slate-800/50 p-1">
              <TabsTrigger
                value="popular"
                className="data-[state=active]:bg-gradient-to-r from-fuchsia-500 to-pink-500 data-[state=active]:text-white"
              >
                Popular Destinations
              </TabsTrigger>
              <TabsTrigger
                value="weather"
                className="data-[state=active]:bg-gradient-to-r from-fuchsia-500 to-pink-500 data-[state=active]:text-white"
              >
                By Weather
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-gradient-to-r from-fuchsia-500 to-pink-500 data-[state=active]:text-white"
              >
                By Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="h-full border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={destination.image || "/placeholder.svg"}
                          alt={destination.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 bg-white/80 dark:bg-slate-800/80 p-1 rounded-full">
                          {getWeatherIcon(destination.weather)}
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400">
                          <MapPin className="h-4 w-4 text-fuchsia-500" />
                          {destination.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{destination.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {destination.activities.map((activity, i) => (
                            <span
                              key={i}
                              className="inline-block px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white border-none">
                          Explore
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="weather" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {["sunny", "cloudy", "rainy", "snowy", "windy"].map((weather) => (
                  <Button
                    key={weather}
                    variant="outline"
                    onClick={() => setSearchQuery(weather)}
                    className="flex items-center gap-2 bg-white/70 dark:bg-slate-800/70 border-none"
                  >
                    {getWeatherIcon(weather)}
                    <span className="capitalize">{weather}</span>
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="h-full border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={destination.image || "/placeholder.svg"}
                          alt={destination.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 bg-white/80 dark:bg-slate-800/80 p-1 rounded-full">
                          {getWeatherIcon(destination.weather)}
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400">
                          <MapPin className="h-4 w-4 text-fuchsia-500" />
                          {destination.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{destination.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white border-none">
                          Explore
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {["Hiking", "Beach", "Cultural", "Adventure", "Food", "Relaxation"].map((activity) => (
                  <Button
                    key={activity}
                    variant="outline"
                    onClick={() => setSearchQuery(activity)}
                    className="bg-white/70 dark:bg-slate-800/70 border-none"
                  >
                    {activity}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="h-full border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={destination.image || "/placeholder.svg"}
                          alt={destination.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400">
                          <MapPin className="h-4 w-4 text-fuchsia-500" />
                          {destination.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {destination.activities.map((activity, i) => (
                            <span
                              key={i}
                              className="inline-block px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{destination.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white border-none">
                          Explore
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}
