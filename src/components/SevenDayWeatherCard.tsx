import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useWeather } from '../context/WeatherContext';
import { getWeatherIcon } from '../utils/weatherIcons';

const SevenDayWeatherCard: React.FC<{ weatherData: any }> = ({ weatherData }) => {
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
        {getWeatherIcon(weatherData.current.condition.code, 60)}
      </View>
      <Text style={styles.temperature}>{`${Math.round(
        weatherData.current.temp_c,
      )}°C`}</Text>
      <View style={styles.conditionContainer}>
        <Text style={styles.condition}>
          {' '}
          {`H: ${Math.round(
            weatherData.forecast.forecastday[0].day.maxtemp_c,
          )}°C`}
        </Text>
        <Text style={styles.condition}>{`   |   L: ${Math.round(
          weatherData.forecast.forecastday[0].day.mintemp_c,
        )}°C`}</Text>
      </View>
      <ScrollView style={styles.forecastContainer}>
        {weatherData.forecast.forecastday.map((day: any) => (
          <View key={day.date} style={styles.forecastItem}>
            <Text style={styles.forecastDate}>
              {new Date(day.date).toLocaleString('en-US', { weekday: 'short' })}
            </Text>
            {getWeatherIcon(day.day.condition.code, 30)}
            <Text style={styles.forecastTemp}>{`H: ${Math.round(
              day.day.maxtemp_c,
            )}°C`}</Text>
            <Text style={styles.forecastTemp}>{`L: ${Math.round(
              day.day.mintemp_c,
            )}°C`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  forecastContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderColor: 'rgba(240, 240, 240, 0.8)',
    borderWidth: 1,
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
    justifyContent: 'center',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 40,
    width: '100%',
  },
  forecastDate: {
    width: 50,
    fontSize: 16,
    fontWeight: 'bold',
  },
  forecastTemp: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SevenDayWeatherCard;
