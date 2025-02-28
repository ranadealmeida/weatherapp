
import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

const API_KEY = "YOUR_WEATHERAPI_KEY"; // Replace with your actual API key
const API_URL = "https://api.weatherapi.com/v1/search.json";

const SearchBarComponent = ({ onCitySelect }: { onCitySelect: (city: string) => void }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = async (text: string) => {
    if (text.length < 2) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?key=d362dcde564c489daa1182049252602&q=${text}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    fetchCities(text);
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
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => {
              setQuery(item.name);
              setSuggestions([]);
              onCitySelect(item.name);
            }}
          >
            <Text>{item.name}, {item.region}, {item.country}</Text>
          </TouchableOpacity>
        )}
      />
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
