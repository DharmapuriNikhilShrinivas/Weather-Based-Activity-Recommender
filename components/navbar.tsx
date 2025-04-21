"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Sun, Cloud, Home, Compass, Umbrella, Menu, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Outdoor", path: "/outdoor", icon: <Sun className="h-5 w-5" /> },
    { name: "Indoor", path: "/indoor", icon: <Umbrella className="h-5 w-5" /> },
    { name: "Explore", path: "/explore", icon: <Compass className="h-5 w-5" /> },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-500"
              >
                <Cloud className="h-6 w-6 text-white" />
              </motion.div>
              <span className="font-bold text-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-transparent bg-clip-text">
                WeatherWise
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`relative ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
                      : "hover:bg-sky-100 dark:hover:bg-sky-900/30"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.name}
                  </span>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-t-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700" />
                )}
                <span className="sr-only">{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>
              </Button>
            )}

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-gradient-to-b from-white to-sky-50 dark:from-slate-900 dark:to-slate-800"
                >
                  <div className="flex flex-col gap-6 mt-8">
                    {navItems.map((item) => (
                      <Link key={item.path} href={item.path}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
                            isActive(item.path)
                              ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
                              : "text-slate-700 dark:text-slate-200"
                          }`}
                        >
                          {item.icon}
                          <span className="font-medium">{item.name}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
