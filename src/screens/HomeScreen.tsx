import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBarComponent from "../components/SearchBarComponent";

const HomeScreen = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedCity ? `Weather in ${selectedCity}` : "Search for a city"}
      </Text>
      <SearchBarComponent onCitySelect={setSelectedCity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

export default HomeScreen;