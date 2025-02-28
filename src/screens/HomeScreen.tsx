import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import WeatherCard from "../components/WeatherCard";
import { getWeather } from "../api/getWeather";
import { WeatherData } from "../types/weather"; ;


const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      const data = await getWeather("Brussels");
  
      console.log("Fetched Weather Data:", data);
  
      if (data) {
        setWeatherData(data);
      }
      
      setLoading(false);
    };
  
    fetchDefaultWeather();
  }, []);
  

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : weatherData ? (
        <WeatherCard data={weatherData} />
      ) : (
        <Text>Failed to fetch weather data.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
});

export default HomeScreen;
