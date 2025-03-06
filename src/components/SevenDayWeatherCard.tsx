import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useWeather} from '../context/WeatherContext';
import {getWeatherIcon} from '../utils/weatherIcons';

const SevenDayWeatherCard: React.FC<{weatherData: any}> = ({weatherData}) => {
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
      <Text
        style={
          styles.cityName
        }>{`${weatherData.location.name}, ${weatherData.location.country}`}</Text>
      <View style={styles.weatherInfo}>
        {getWeatherIcon(weatherData.current.condition.code, 60)}
      </View>
      <Text
        style={styles.temperature}>{`${weatherData.current.temp_c}°C`}</Text>
      <Text style={styles.condition}>{weatherData.current.condition.text}</Text>
      <TouchableOpacity onPress={handleToggleFavorite}>
        <Icon
          name={isFavorited ? 'heart' : 'heart-o'}
          size={30}
          color={isFavorited ? 'red' : 'black'}
        />
      </TouchableOpacity>
      <FlatList
        data={weatherData.forecast.forecastday}
        keyExtractor={item => item.date}
        renderItem={({item}) => (
          <View style={styles.forecastItem}>
            <Text style={styles.forecastDate}>{new Date(item.date).toLocaleString('en-US', { weekday: 'short' })}</Text>
            <View style={styles.icon}>{getWeatherIcon(item.day.condition.code, 30)}</View>
            <Text style={styles.forecastTemp}>{`${item.day.avgtemp_c}°C`}</Text>
            <Text style={styles.forecastCondition}>
              {item.day.condition.text}
            </Text>
          </View>
        )}
      />
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
  cityName: {
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
  forecastCondition: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    width: 120,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SevenDayWeatherCard;
