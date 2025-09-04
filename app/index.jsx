 
// import React, { useEffect, useState, useCallback } from "react";
// import { SafeAreaView, Text, Pressable, StyleSheet, ActivityIndicator, View, TextInput } from "react-native";
// import { useRouter, useFocusEffect } from "expo-router";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import axios from "axios";
// import { useTheme } from "../context/ThemeContext";
// import { OPEN_WEATHER_KEY } from "../config/weatherApi";

// export default function HomeScreen() {
//   const { theme, toggleTheme } = useTheme();
//   const router = useRouter();
//   const [weather, setWeather] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [city, setCity] = useState("");

//   const fetchWeather = async (cityName) => {
//     try {
//       setWeather(null); // clear previous search
//       setIsLoading(true);
//       const res = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${OPEN_WEATHER_KEY}`
//       );
//       setWeather(res.data);
//     } catch (err) {
//       console.error(err);
//       setWeather(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeather("Nairobi"); // fetch default city on mount
//   }, []);

//   // Clear weather state when screen gains focus
//   useFocusEffect(
//     useCallback(() => {
//       setWeather(null);
//       setCity("");
//     }, [])
//   );

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <Text style={[styles.title, { color: theme.colors.primary }]}>WeatherApp</Text>

//       {/* Search Input */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           placeholder="Enter city..."
//           placeholderTextColor={theme.colors.textLight}
//           value={city}
//           onChangeText={setCity}
//           style={[styles.input, { color: theme.colors.textDark, borderColor: theme.colors.primary }]}
//         />
//         <Pressable
//           style={[styles.searchBtn, { backgroundColor: theme.colors.primary }]}
//           onPress={() => city.trim() && fetchWeather(city)}
//         >
//           <Text style={{ color: "#fff" }}>Search</Text>
//         </Pressable>
//       </View>

//       {isLoading ? (
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//       ) : weather ? (
//         <View style={[styles.weatherBox, { backgroundColor: theme.colors.card }]}>
//           <MaterialCommunityIcons
//             name="weather-partly-cloudy"
//             size={50}
//             color={theme.colors.primary}
//           />
//           <Text style={[styles.temp, { color: theme.colors.textDark }]}>
//             {Math.round(weather.main.temp)}°C
//           </Text>
//           <Text style={{ color: theme.colors.textLight }}>
//             {weather.weather[0].description}
//           </Text>
//           <Text style={{ color: theme.colors.textLight }}>
//             {weather.name}, {weather.sys.country}
//           </Text>
//         </View>
//       ) : (
//         <Text style={{ color: theme.colors.danger }}>City not found</Text>
//       )}

//       {/* Navigation */}
//       <Pressable
//         style={[styles.button, { backgroundColor: theme.colors.primary }]}
//         onPress={() => router.push("/forecast")}
//       >
//         <Text style={styles.buttonText}>7-Day Forecast</Text>
//       </Pressable>

//       <Pressable
//         style={[styles.button, { backgroundColor: theme.colors.accent }]}
//         onPress={() => router.push("/alerts")}
//       >
//         <Text style={styles.buttonText}>Weather Alerts</Text>
//       </Pressable>

//       <Pressable
//         style={[styles.button, { backgroundColor: theme.colors.card }]}
//         onPress={toggleTheme}
//       >
//         <Text style={[styles.buttonText, { color: theme.colors.textDark }]}>
//           Toggle {theme.mode === "light" ? "Dark" : "Light"} Mode
//         </Text>
//       </Pressable>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
//   title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
//   searchContainer: { flexDirection: "row", marginBottom: 20 },
//   input: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 10, marginRight: 8 },
//   searchBtn: { padding: 10, borderRadius: 8, justifyContent: "center", alignItems: "center" },
//   weatherBox: { alignItems: "center", padding: 20, borderRadius: 16, marginBottom: 20 },
//   temp: { fontSize: 40, fontWeight: "bold" },
//   button: {
//     padding: 14,
//     borderRadius: 12,
//     marginTop: 12,
//     width: "80%",
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
// });


import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable, StyleSheet, ActivityIndicator, View, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { OPEN_WEATHER_KEY } from "../config/weatherApi";

export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setIsLoading(true);
      setWeather(null); // Clear previous weather
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${OPEN_WEATHER_KEY}`
      );
      setWeather(res.data);
    } catch (err) {
      console.error(err);
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToForecast = () => {
    if (!city.trim()) return;
    router.push({ pathname: "/forecast", params: { city } });
    setWeather(null); // clear after navigation
  };

  const navigateToAlerts = () => {
    if (!city.trim()) return;
    router.push({ pathname: "/alerts", params: { city } });
    setWeather(null); // clear after navigation
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>WeatherApp</Text>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Enter city..."
          placeholderTextColor={theme.colors.textLight}
          value={city}
          onChangeText={setCity}
          style={[styles.input, { color: theme.colors.textDark, borderColor: theme.colors.primary }]}
        />
        <Pressable
          style={[styles.searchBtn, { backgroundColor: theme.colors.primary }]}
          onPress={() => fetchWeather(city)}
        >
          <Text style={{ color: "#fff" }}>Search</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : weather ? (
        <View style={[styles.weatherBox, { backgroundColor: theme.colors.card }]}>
          <MaterialCommunityIcons
            name="weather-partly-cloudy"
            size={50}
            color={theme.colors.primary}
          />
          <Text style={[styles.temp, { color: theme.colors.textDark }]}>
            {Math.round(weather.main.temp)}°C
          </Text>
          <Text style={{ color: theme.colors.textLight }}>
            {weather.weather[0].description}
          </Text>
          <Text style={{ color: theme.colors.textLight }}>
            {weather.name}, {weather.sys.country}
          </Text>
        </View>
      ) : (
        city.trim() !== "" && <Text style={{ color: theme.colors.danger }}>City not found</Text>
      )}

      {/* Navigation */}
      <Pressable style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={navigateToForecast}>
        <Text style={styles.buttonText}>7-Day Forecast</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: theme.colors.accent }]} onPress={navigateToAlerts}>
        <Text style={styles.buttonText}>Weather Alerts</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: theme.colors.card }]} onPress={toggleTheme}>
        <Text style={[styles.buttonText, { color: theme.colors.textDark }]}>
          Toggle {theme.mode === "light" ? "Dark" : "Light"} Mode
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  searchContainer: { flexDirection: "row", marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 10, marginRight: 8 },
  searchBtn: { padding: 10, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  weatherBox: { alignItems: "center", padding: 20, borderRadius: 16, marginBottom: 20 },
  temp: { fontSize: 40, fontWeight: "bold" },
  button: { padding: 14, borderRadius: 12, marginTop: 12, width: "80%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
