import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchBarComponent from '../components/SearchBarComponent';
import SevenDayWeatherCard from '../components/SevenDayWeatherCard';
import {useWeather} from '../context/WeatherContext';
import {getWeatherBackground} from '../utils/weatherBackground';

const HomeScreen = () => {
  const {selectedCity, weatherData, setSelectedCity} = useWeather();
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={
        weatherData
          ? getWeatherBackground(weatherData.current.condition.code)
          : require('../assets/default-background.jpg')
      }
      style={styles.backgroundImage}>
      <ScrollView>
        <SearchBarComponent onCitySelect={setSelectedCity} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Favourites')}>
          <Text style={styles.buttonText}>Go to Favourites</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.container}>
          {weatherData ? (
            <SevenDayWeatherCard weatherData={weatherData} />
          ) : (
            <Text style={styles.errorText}>No weather data available.</Text>
          )}
        </ScrollView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {color: 'red', marginTop: 10},
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
