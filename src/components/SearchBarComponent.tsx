import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useWeather } from '../context/WeatherContext';

const SearchBarComponent = ({
  onCitySelect,
}: {
  onCitySelect: (city: string) => void;
}) => {
  const {     
    query,
    setQuery,
    suggestions,
    loadingSuggestions,
    handleSearch,
    handleCitySelect, } = useWeather();

  return (
    <View style={styles.suggestionListContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search city..."
        placeholderTextColor="#000"
        onChangeText={handleSearch}
        value={query}
      />
      {suggestions.length > 0 && (
        <ScrollView style={styles.suggestionList}>
          {loadingSuggestions && <ActivityIndicator size="small" color="#0000ff" />}
          {suggestions.map(item => (
            <TouchableOpacity
              key={item.id.toString()}
              style={styles.suggestionItem}
              onPress={() => handleCitySelect(item.name)}>
              <Text>
                {`${item.name},`} {item.region && `${item.region},`} {item.country}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  searchInput: {
    height: 40,
    borderColor: 'rgba(240, 240, 240, 0.8)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  suggestionListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  suggestionList: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default SearchBarComponent;
