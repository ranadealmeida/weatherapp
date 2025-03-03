import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBarComponent from "../components/SearchBarComponent";
import WeatherCard from "../components/WeatherCard";
import { getWeather } from "../api/getWeather";
import { WeatherData } from "../types/weather";

const HomeScreen = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      const data = await getWeather(selectedCity);
      setWeatherData(data);
    };

    fetchWeather();
  }, [selectedCity]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedCity ? `Weather in ${selectedCity}` : "Search for a city"}
      </Text>
      <SearchBarComponent onCitySelect={setSelectedCity} />
      {weatherData ? (
        <WeatherCard data={weatherData} />
      ) : (
        <Text style={styles.errorText}>No data available. Search for a city.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  errorText: { color: "red", marginTop: 10 },
});

export default HomeScreen;
