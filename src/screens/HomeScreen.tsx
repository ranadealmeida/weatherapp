import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchBarComponent from '../components/SearchBarComponent';
import WeatherCard from '../components/WeatherCard';
import {useWeather} from '../context/WeatherContext';

const HomeScreen = () => {
  const {selectedCity, weatherData, setSelectedCity} = useWeather();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedCity ? `Weather in ${selectedCity}` : 'Search for a city'}
      </Text>
      <SearchBarComponent onCitySelect={setSelectedCity} />
      {weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        <Text style={styles.errorText}>No weather data available.</Text>
      )}
      <Button
        title="Go to Favourites"
        onPress={() => navigation.navigate('Favourites')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  errorText: {color: 'red', marginTop: 10},
});

export default HomeScreen;
