import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchBarComponent from '../components/SearchBarComponent';
import SevenDayWeatherCard from '../components/SevenDayWeatherCard';
import {useWeather} from '../context/WeatherContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const {selectedCity, weatherData, setSelectedCity} = useWeather();
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {selectedCity ? `Weather in ${selectedCity}` : 'Search for a city'}
      </Text>
      <SearchBarComponent onCitySelect={setSelectedCity} />
      {weatherData ? (
        <SevenDayWeatherCard weatherData={weatherData} />
      ) : (
        <Text style={styles.errorText}>No weather data available.</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Favourites')}>
        <Text style={styles.buttonText}>Go to Favourites</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1, padding: 20, backgroundColor: '#fff'},
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  errorText: {color: 'red', marginTop: 10},
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
