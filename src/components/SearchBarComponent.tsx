import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

const API_KEY = "YOUR_WEATHERAPI_KEY"; // Replace with your actual API key
const API_URL = "https://api.weatherapi.com/v1/search.json";

const SearchBarComponent = ({ onCitySelect }: { onCitySelect: (city: string) => void }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const fetchCities = async (text: string) => {
    if (text.length < 2 || text === selectedCity) return; // Prevent fetching if the user selected a city
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?key=${"d362dcde564c489daa1182049252602"}&q=${text}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    setSelectedCity(null); // Reset selected city to allow new suggestions
    fetchCities(text);
  };

  const handleCitySelect = (city: string) => {
    setQuery(city);
    setSuggestions([]); // Clear the suggestions list
    setSelectedCity(city); // Store the selected city
    onCitySelect(city);
  };

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search city..."
        onChangeText={handleSearch}
        value={query}
      />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleCitySelect(item.name)}
            >
              <Text>{item.name}, {item.region}, {item.country}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});

export default SearchBarComponent;
