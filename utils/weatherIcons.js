import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export const getWeatherIcon = (weather) => {
  switch (weather?.toLowerCase()) {
    case "clear":
      return <MaterialCommunityIcons name="weather-sunny" size={40} color="#fcbf49" />;
    case "clouds":
      return <MaterialCommunityIcons name="weather-cloudy" size={40} color="#6c757d" />;
    case "rain":
      return <MaterialCommunityIcons name="weather-rainy" size={40} color="#0077b6" />;
    case "thunderstorm":
      return <MaterialCommunityIcons name="weather-lightning" size={40} color="#d62828" />;
    case "snow":
      return <MaterialCommunityIcons name="weather-snowy" size={40} color="#90e0ef" />;
    case "mist":
    case "haze":
    case "fog":
      return <MaterialCommunityIcons name="weather-fog" size={40} color="#adb5bd" />;
    default:
      return <MaterialCommunityIcons name="weather-partly-cloudy" size={40} color="#2a9d8f" />;
  }
};
