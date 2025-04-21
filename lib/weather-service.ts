// Mock data for the weather service
// In a real application, this would connect to a weather API

// Mock weather data
export async function getWeatherData(location: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return mock data based on location
  const weatherData = {
    "New York": {
      condition: "sunny",
      temperature: 24,
      humidity: 45,
      windSpeed: 8,
      icon: "sun",
    },
    London: {
      condition: "rainy",
      temperature: 16,
      humidity: 80,
      windSpeed: 12,
      icon: "cloud-rain",
    },
    Tokyo: {
      condition: "cloudy",
      temperature: 22,
      humidity: 60,
      windSpeed: 5,
      icon: "cloud",
    },
    Sydney: {
      condition: "windy",
      temperature: 20,
      humidity: 55,
      windSpeed: 15,
      icon: "wind",
    },
  }

  return weatherData[location as keyof typeof weatherData] || weatherData["New York"]
}

// Mock activity recommendations based on weather
export async function getActivities(weatherCondition: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const allActivities = [
    {
      name: "Beach Day",
      description: "Enjoy the sun and sand at your local beach.",
      weatherType: "sunny",
      category: "outdoor",
      duration: "3-4 hours",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Hiking",
      description: "Explore nature trails and enjoy scenic views.",
      weatherType: "sunny",
      category: "adventure",
      duration: "2-5 hours",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Picnic in the Park",
      description: "Pack a lunch and enjoy eating outdoors.",
      weatherType: "sunny",
      category: "social",
      duration: "1-2 hours",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Cycling",
      description: "Go for a bike ride around your neighborhood or on trails.",
      weatherType: "sunny",
      category: "outdoor",
      duration: "1-3 hours",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Visit a Museum",
      description: "Explore art, history, or science exhibits indoors.",
      weatherType: "rainy",
      category: "indoor",
      duration: "2-3 hours",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Movie Marathon",
      description: "Stay cozy and watch your favorite films or series.",
      weatherType: "rainy",
      category: "relaxation",
      duration: "3+ hours",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Board Games",
      description: "Gather friends for some tabletop gaming fun.",
      weatherType: "rainy",
      category: "social",
      duration: "2-4 hours",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Cooking Class",
      description: "Learn to make a new dish or bake something delicious.",
      weatherType: "rainy",
      category: "indoor",
      duration: "1-2 hours",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Cloud Watching",
      description: "Find a comfortable spot to observe cloud formations.",
      weatherType: "cloudy",
      category: "relaxation",
      duration: "30-60 mins",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Photography Walk",
      description: "Capture moody photos with the diffused lighting.",
      weatherType: "cloudy",
      category: "creative",
      duration: "1-2 hours",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Kite Flying",
      description: "Take advantage of the wind to fly a kite.",
      weatherType: "windy",
      category: "outdoor",
      duration: "1-2 hours",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Snowman Building",
      description: "Create a snowman or snow sculptures.",
      weatherType: "snowy",
      category: "outdoor",
      duration: "1-2 hours",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  // Filter activities based on weather condition
  return allActivities.filter((activity) => activity.weatherType.toLowerCase() === weatherCondition.toLowerCase())
}

// Get outdoor activities
export async function getOutdoorActivities() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return [
    {
      name: "Beach Day",
      description: "Enjoy the sun and sand at your local beach.",
      weatherType: "sunny",
      difficulty: "Easy",
    },
    {
      name: "Hiking",
      description: "Explore nature trails and enjoy scenic views.",
      weatherType: "sunny",
      difficulty: "Moderate",
    },
    {
      name: "Picnic in the Park",
      description: "Pack a lunch and enjoy eating outdoors.",
      weatherType: "sunny",
      difficulty: "Easy",
    },
    {
      name: "Cycling",
      description: "Go for a bike ride around your neighborhood or on trails.",
      weatherType: "sunny",
      difficulty: "Moderate",
    },
    {
      name: "Gardening",
      description: "Plant flowers, vegetables, or herbs in your garden.",
      weatherType: "sunny",
      difficulty: "Easy",
    },
    {
      name: "Outdoor Yoga",
      description: "Practice yoga in a park or your backyard.",
      weatherType: "sunny",
      difficulty: "Moderate",
    },
    {
      name: "Nature Photography",
      description: "Capture the beauty of the outdoors with your camera.",
      weatherType: "cloudy",
      difficulty: "Easy",
    },
    {
      name: "Bird Watching",
      description: "Observe and identify different bird species.",
      weatherType: "cloudy",
      difficulty: "Easy",
    },
    {
      name: "Fishing",
      description: "Spend a relaxing day fishing at a local lake or river.",
      weatherType: "cloudy",
      difficulty: "Moderate",
    },
    {
      name: "Walking Tour",
      description: "Explore your city or a nearby town on foot.",
      weatherType: "cloudy",
      difficulty: "Easy",
    },
    {
      name: "Puddle Jumping",
      description: "Embrace the rain and have fun jumping in puddles (great for kids).",
      weatherType: "rainy",
      difficulty: "Easy",
    },
    {
      name: "Rain Photography",
      description: "Capture unique photos of raindrops and reflections.",
      weatherType: "rainy",
      difficulty: "Moderate",
    },
    {
      name: "Snowman Building",
      description: "Create a snowman or snow sculptures.",
      weatherType: "snowy",
      difficulty: "Easy",
    },
    {
      name: "Sledding",
      description: "Find a hill and enjoy sliding down on a sled.",
      weatherType: "snowy",
      difficulty: "Easy",
    },
    {
      name: "Snowshoeing",
      description: "Hike through snowy landscapes with snowshoes.",
      weatherType: "snowy",
      difficulty: "Moderate",
    },
    {
      name: "Ice Skating",
      description: "Skate on a frozen pond or at an outdoor rink.",
      weatherType: "snowy",
      difficulty: "Moderate",
    },
    {
      name: "Kite Flying",
      description: "Take advantage of the wind to fly a kite.",
      weatherType: "windy",
      difficulty: "Easy",
    },
    {
      name: "Sailing",
      description: "Go sailing on a lake or the ocean.",
      weatherType: "windy",
      difficulty: "Advanced",
    },
    {
      name: "Windsurfing",
      description: "Try windsurfing if you're near a body of water.",
      weatherType: "windy",
      difficulty: "Advanced",
    },
    {
      name: "Frisbee",
      description: "Play frisbee in an open area.",
      weatherType: "windy",
      difficulty: "Easy",
    },
  ]
}

// Get indoor activities
export async function getIndoorActivities() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return [
    {
      name: "Reading",
      description: "Curl up with a good book.",
      category: "relaxation",
      mood: "Peaceful",
    },
    {
      name: "Meditation",
      description: "Practice mindfulness and relaxation techniques.",
      category: "relaxation",
      mood: "Calm",
    },
    {
      name: "Spa Day at Home",
      description: "Create a spa experience with face masks, bath bombs, etc.",
      category: "relaxation",
      mood: "Pampered",
    },
    {
      name: "Nap Time",
      description: "Take a refreshing nap to recharge.",
      category: "relaxation",
      mood: "Restful",
    },
    {
      name: "Online Course",
      description: "Learn something new through an online course.",
      category: "learning",
      mood: "Curious",
    },
    {
      name: "Documentary",
      description: "Watch a documentary on a topic that interests you.",
      category: "learning",
      mood: "Informed",
    },
    {
      name: "Language Practice",
      description: "Practice a new language using apps or online resources.",
      category: "learning",
      mood: "Accomplished",
    },
    {
      name: "Podcast",
      description: "Listen to an educational or entertaining podcast.",
      category: "learning",
      mood: "Engaged",
    },
    {
      name: "Movie Marathon",
      description: "Watch a series of movies from your favorite genre or director.",
      category: "entertainment",
      mood: "Entertained",
    },
    {
      name: "Video Games",
      description: "Play your favorite video games solo or with friends online.",
      category: "entertainment",
      mood: "Excited",
    },
    {
      name: "TV Show Binge",
      description: "Catch up on episodes of your favorite series.",
      category: "entertainment",
      mood: "Absorbed",
    },
    {
      name: "Virtual Reality",
      description: "Explore virtual worlds if you have VR equipment.",
      category: "entertainment",
      mood: "Immersed",
    },
    {
      name: "Drawing or Painting",
      description: "Express yourself through visual art.",
      category: "creative",
      mood: "Expressive",
    },
    {
      name: "Writing",
      description: "Write a story, poem, journal entry, or blog post.",
      category: "creative",
      mood: "Reflective",
    },
    {
      name: "DIY Crafts",
      description: "Create handmade items from materials you have at home.",
      category: "creative",
      mood: "Productive",
    },
    {
      name: "Music Creation",
      description: "Play an instrument or compose music digitally.",
      category: "creative",
      mood: "Inspired",
    },
    {
      name: "Board Games",
      description: "Play board games with family or roommates.",
      category: "social",
      mood: "Playful",
    },
    {
      name: "Video Chat",
      description: "Connect with friends or family via video call.",
      category: "social",
      mood: "Connected",
    },
    {
      name: "Cooking Together",
      description: "Prepare a meal with others in your household.",
      category: "social",
      mood: "Collaborative",
    },
    {
      name: "Online Multiplayer Games",
      description: "Play games online with friends or new people.",
      category: "social",
      mood: "Competitive",
    },
  ]
}
