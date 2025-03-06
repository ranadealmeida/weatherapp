import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useWeather} from '../context/WeatherContext';
import {getWeatherIcon} from '../utils/weatherIcons';

const WeatherCard: React.FC<{weatherData: any}> = ({weatherData}) => {
  const {favoriteCities, addFavoriteCity, removeFavoriteCity} = useWeather();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(favoriteCities.includes(weatherData.location.name));
  }, [favoriteCities, weatherData.location.name]);

  if (!weatherData) {
    return <Text>Loading weather...</Text>;
  }

  const handleToggleFavorite = () => {
    if (isFavorited) {
      removeFavoriteCity(weatherData.location.name);
      setIsFavorited(false);
    } else {
      addFavoriteCity(weatherData.location.name);
      setIsFavorited(true);
    }
  };

  return (
    <View style={styles.card}>
        <TouchableOpacity style={styles.favIcon}onPress={handleToggleFavorite}>
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
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
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
});

export default WeatherCard;
