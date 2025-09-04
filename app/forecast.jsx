// import React, { useEffect, useState } from "react";
// import { SafeAreaView, Text, FlatList, ActivityIndicator, StyleSheet, View, Pressable } from "react-native";
// import axios from "axios";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useTheme } from "../context/ThemeContext";
// import { OPEN_WEATHER_KEY } from "../config/weatherApi";
// import { useRouter, useSearchParams } from "expo-router";

// export default function ForecastScreen() {
//   const { theme } = useTheme();
//   const router = useRouter();
//   const { city } = useSearchParams(); // receives city from HomeScreen
//   const [forecast, setForecast] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (city) fetchForecast(city);
//   }, [city]);

//   const fetchForecast = async (cityName) => {
//     try {
//       setIsLoading(true);
//       const res = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${OPEN_WEATHER_KEY}`
//       );
//       // OpenWeather returns 3-hour intervals; we take first 7 entries for a 7-day style
//       setForecast(res.data.list.slice(0, 7));
//     } catch (err) {
//       console.error(err);
//       setForecast([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
//       <Text style={[styles.city, { color: theme.colors.primary }]}>{city}</Text>
//       <Text style={[styles.date, { color: theme.colors.textDark }]}>{item.dt_txt}</Text>
//       <MaterialCommunityIcons
//         name={
//           item.weather[0].main.toLowerCase().includes("cloud")
//             ? "weather-cloudy"
//             : item.weather[0].main.toLowerCase().includes("rain")
//             ? "weather-rainy"
//             : "weather-sunny"
//         }
//         size={30}
//         color={theme.colors.primary}
//       />
//       <Text style={{ color: theme.colors.textDark }}>{Math.round(item.main.temp)}°C</Text>
//       <Text style={{ color: theme.colors.textLight }}>{item.weather[0].description}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <Pressable onPress={() => router.back()} style={{ marginBottom: 20 }}>
//         <Text style={{ color: theme.colors.primary }}>⬅ Back</Text>
//       </Pressable>

//       <Text style={[styles.title, { color: theme.colors.primary }]}>
//         7-Day Forecast for {city || "Selected City"}
//       </Text>

//       {isLoading ? (
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//       ) : forecast.length === 0 ? (
//         <Text style={{ color: theme.colors.textLight }}>No forecast data available</Text>
//       ) : (
//         <FlatList
//           data={forecast}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
//   card: {
//     padding: 12,
//     marginVertical: 6,
//     borderRadius: 12,
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   city: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
//   date: { fontSize: 16, fontWeight: "600" },
// });


import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, ActivityIndicator, StyleSheet, View, Pressable } from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { OPEN_WEATHER_KEY } from "../config/weatherApi";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ForecastScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const city = params.city || "Nairobi";

  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchForecast(city);
  }, [city]);

  const fetchForecast = async (cityName) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${OPEN_WEATHER_KEY}`
      );
      setForecast(res.data.list.slice(0, 7));
    } catch (err) {
      console.error(err);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.date, { color: theme.colors.textDark }]}>
        {city} - {item.dt_txt}
      </Text>
      <MaterialCommunityIcons
        name="weather-partly-cloudy"
        size={24}
        color={theme.colors.primary}
      />
      <Text style={{ color: theme.colors.textDark }}>{item.main.temp}°C</Text>
      <Text style={{ color: theme.colors.textLight }}>{item.weather[0].description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Pressable onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Text style={{ color: theme.colors.primary }}>⬅ Back</Text>
      </Pressable>

      <Text style={[styles.title, { color: theme.colors.primary }]}>
        7-Day Forecast for {city}
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={forecast}
          renderItem={renderItem}
          keyExtractor={(item, idx) => idx.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  card: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    flexDirection: "column",
    alignItems: "center",
  },
  date: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
});
