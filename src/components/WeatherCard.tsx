import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useWeather} from '../context/WeatherContext';

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
    <View>
      <Text>{`${weatherData.location.name}, ${weatherData.location.country}`}</Text>
      <Text>{`${weatherData.current.temp_c}°C`}</Text>
      <Text>{weatherData.current.condition.text}</Text>
      <TouchableOpacity onPress={handleToggleFavorite}>
        <Icon
          name={isFavorited ? 'heart' : 'heart-o'}
          size={30}
          color={isFavorited ? 'red' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default WeatherCard;
