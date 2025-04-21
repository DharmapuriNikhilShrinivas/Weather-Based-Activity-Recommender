"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, CloudRain, Snowflake, Wind, Cloud, Clock, Tag } from "lucide-react"

interface Activity {
  name: string
  description: string
  weatherType: string
  category: string
  duration: string
  image?: string
}

interface ActivityGridProps {
  activities: Activity[]
  loading: boolean
}

export default function ActivityGrid({ activities, loading }: ActivityGridProps) {
  // Update the getCardBackground function to use more pleasing colors
  const getCardBackground = (weatherType: string) => {
    switch (weatherType.toLowerCase()) {
      case "sunny":
        return "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/20"
      case "cloudy":
        return "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20"
      case "rainy":
        return "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/20"
      case "snowy":
        return "bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/20"
      case "windy":
        return "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/20"
      default:
        return "bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/30 dark:to-slate-800/20"
    }
  }

  // Update the getCategoryColor function to use more pleasing colors
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "outdoor":
        return "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
      case "indoor":
        return "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
      case "social":
        return "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
      case "relaxation":
        return "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      case "adventure":
        return "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
      case "creative":
        return "bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600"
      default:
        return "bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600"
    }
  }

  const getWeatherIcon = (weatherType: string) => {
    switch (weatherType.toLowerCase()) {
      case "sunny":
        return <Sun className="h-4 w-4 text-amber-500" />
      case "cloudy":
        return <Cloud className="h-4 w-4 text-slate-500" />
      case "rainy":
        return <CloudRain className="h-4 w-4 text-blue-500" />
      case "snowy":
        return <Snowflake className="h-4 w-4 text-sky-300" />
      case "windy":
        return <Wind className="h-4 w-4 text-slate-500" />
      default:
        return <Sun className="h-4 w-4 text-amber-500" />
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="h-[200px] animate-pulse bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-none"
          >
            <CardHeader className="pb-2">
              <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
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
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {activities.map((activity, index) => (
        <motion.div key={index} variants={item} whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Card
            className={`h-full border-none shadow-md hover:shadow-lg transition-all ${getCardBackground(
              activity.weatherType,
            )}`}
          >
            <CardHeader className="pb-2">
              {/* Update the CardTitle to use a more pleasing gradient */}
              <CardTitle className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
                {activity.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                {getWeatherIcon(activity.weatherType)}
                <span className="capitalize">{activity.weatherType} weather</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-300">{activity.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Badge className={`border-none text-white ${getCategoryColor(activity.category)}`}>
                <Tag className="h-3 w-3 mr-1" />
                {activity.category}
              </Badge>
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3 w-3 mr-1" />
                {activity.duration}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
