import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Config from 'react-native-config';
import {useWeather} from '../context/WeatherContext';
import {getCitySuggestions} from '../api/getCitySuggestions'; // Import the fetchCities function

const API_KEY = Config.API_KEY;

const SearchBarComponent = ({
  onCitySelect,
}: {
  onCitySelect: (city: string) => void;
}) => {
  const {setSelectedCity} = useWeather();
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const cities = await getCitySuggestions(text, API_KEY);
      setSuggestions(cities);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
    setLoading(false);
  };

  const handleCitySelect = (city: string) => {
    setQuery(city);
    setSuggestions([]);
    setSelectedCity(city);
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
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleCitySelect(item.name)}>
              <Text>
                {item.name}, {item.region}, {item.country}
              </Text>
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default SearchBarComponent;
