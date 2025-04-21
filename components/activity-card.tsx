"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, CloudRain, Snowflake, Wind, Cloud } from "lucide-react"

interface ActivityCardProps {
  activity: {
    name: string
    description: string
    weatherType: string
    category: string
    duration: string
  }
}

export default function ActivityCard({ activity }: ActivityCardProps) {
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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "outdoor":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
      case "indoor":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "social":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      case "relaxation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "adventure":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200"
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full border-sky-100 dark:border-sky-800 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{activity.name}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            {getWeatherIcon(activity.weatherType)}
            <span className="capitalize">{activity.weatherType} weather</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-300">{activity.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Badge variant="outline" className={getCategoryColor(activity.category)}>
            {activity.category}
          </Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400">{activity.duration}</span>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
