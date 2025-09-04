// import React, { useEffect, useState } from "react";
// import { SafeAreaView, Text, StyleSheet, ActivityIndicator, View, Pressable } from "react-native";
// import axios from "axios";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useTheme } from "../context/ThemeContext";
// import { OPEN_WEATHER_KEY } from "../config/weatherApi";
// import { useRouter, useSearchParams } from "expo-router";

// export default function AlertsScreen() {
//   const { theme } = useTheme();
//   const router = useRouter();
//   const { city } = useSearchParams(); // receives city from HomeScreen
//   const [alerts, setAlerts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (city) fetchAlerts(city);
//   }, [city]);

//   const fetchAlerts = async (cityName) => {
//     try {
//       setIsLoading(true);

//       // First, get coordinates for the city
//       const geoRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPEN_WEATHER_KEY}`
//       );
//       const { lat, lon } = geoRes.data.coord;

//       // Then get alerts using One Call API
//       const res = await axios.get(
//         `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${OPEN_WEATHER_KEY}`
//       );

//       setAlerts(res.data.alerts || []);
//     } catch (err) {
//       console.error(err);
//       setAlerts([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
//       <Pressable onPress={() => router.back()} style={{ marginBottom: 20 }}>
//         <Text style={{ color: theme.colors.primary }}>⬅ Back</Text>
//       </Pressable>

//       <Text style={[styles.title, { color: theme.colors.primary }]}>
//         Weather Alerts for {city || "Selected City"}
//       </Text>

//       {isLoading ? (
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//       ) : alerts.length === 0 ? (
//         <Text style={{ color: theme.colors.textLight }}>No active alerts 🎉</Text>
//       ) : (
//         alerts.map((alert, index) => (
//           <View key={index} style={[styles.alertBox, { backgroundColor: theme.colors.card }]}>
//             <MaterialCommunityIcons name="alert-circle" size={22} color={theme.colors.danger} />
//             <View style={{ flex: 1, marginLeft: 10 }}>
//               <Text style={[styles.alertTitle, { color: theme.colors.danger }]}>
//                 {alert.event}
//               </Text>
//               <Text style={{ color: theme.colors.textDark }}>{alert.description}</Text>
//             </View>
//           </View>
//         ))
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
//   alertBox: {
//     flexDirection: "row",
//     padding: 12,
//     borderRadius: 10,
//     marginVertical: 6,
//     alignItems: "center",
//   },
//   alertTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
// });

import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, ActivityIndicator, View, Pressable } from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { OPEN_WEATHER_KEY } from "../config/weatherApi";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function AlertsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const city = params.city || "Nairobi";

  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlerts(city);
  }, [city]);

  const fetchAlerts = async (cityName) => {
    try {
      setIsLoading(true);
      const resGeo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPEN_WEATHER_KEY}`
      );
      if (resGeo.data.length === 0) return setAlerts([]);
      const { lat, lon } = resGeo.data[0];

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${OPEN_WEATHER_KEY}`
      );
      setAlerts(res.data.alerts || []);
    } catch (err) {
      console.error(err);
      setAlerts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Pressable onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Text style={{ color: theme.colors.primary }}>⬅ Back</Text>
      </Pressable>

      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Weather Alerts for {city}
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : alerts.length === 0 ? (
        <Text style={{ color: theme.colors.textLight }}>No active alerts 🎉</Text>
      ) : (
        alerts.map((alert, idx) => (
          <View key={idx} style={[styles.alertBox, { backgroundColor: theme.colors.card }]}>
            <MaterialCommunityIcons name="alert-circle" size={22} color={theme.colors.danger} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.alertTitle, { color: theme.colors.danger }]}>{alert.event}</Text>
              <Text style={{ color: theme.colors.textDark }}>{alert.description}</Text>
            </View>
          </View>
        ))
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  alertBox: { flexDirection: "row", padding: 12, borderRadius: 10, marginVertical: 6, alignItems: "center" },
  alertTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
});
