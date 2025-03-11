import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useWeather } from '../context/WeatherContext';
import { getWeatherIcon } from '../utils/weatherIcons';
import { getWeatherBackground } from '../utils/weatherBackground';

const WeatherCard: React.FC<{ weatherData: any }> = ({ weatherData }) => {
  const { favoriteCities, addFavoriteCity, removeFavoriteCity } = useWeather();
    const isFavorited = favoriteCities.includes(weatherData.location.name);
  
    if (!weatherData) {
      return <Text>Loading weather...</Text>;
    }
  
    const handleToggleFavorite = () => {
      if (isFavorited) {
        removeFavoriteCity(weatherData.location.name);
      } else {
        addFavoriteCity(weatherData.location.name);
      }
    };

  return (
    <ImageBackground
      source={
        weatherData
          ? getWeatherBackground(weatherData.current.condition.code)
          : require('../assets/default-background.jpg')
      }
      style={styles.backgroundImage}
      imageStyle={{ borderRadius: 15 }}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.favIcon} onPress={handleToggleFavorite}>
          <Icon
            name={isFavorited ? 'heart' : 'heart-o'}
            size={30}
            color={isFavorited ? 'red' : 'black'}
          />
        </TouchableOpacity>
        <Text
          style={
            styles.cityName
          }>{`${weatherData.location.name}, ${weatherData.location.country}`}</Text>
        <View style={styles.weatherInfo}>
          {getWeatherIcon(weatherData.current.condition.code, 50)}
        </View>
        <Text
          style={styles.temperature}>{`${Math.round(weatherData.current.temp_c)}°C`}</Text>
        <Text style={styles.condition}>{weatherData.current.condition.text}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(254, 254, 254, 0.6)',
    borderRadius: 15,
  },
  favIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  cityName: {
    paddingTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  condition: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    marginVertical: 10,
  },
});

export default WeatherCard;
