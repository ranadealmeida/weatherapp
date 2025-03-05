import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useWeather} from '../context/WeatherContext';
import WeatherCard from '../components/WeatherCard';
import {getWeather} from '../api/getWeather';

const FavouritesScreen: React.FC = () => {
  const {favoriteCities} = useWeather();
  const [weatherDataList, setWeatherDataList] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await Promise.all(
        favoriteCities.map(city => getWeather(city)),
      );
      setWeatherDataList(data);
    };

    fetchWeatherData();
  }, [favoriteCities]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Cities</Text>
      <FlatList
        data={weatherDataList}
        keyExtractor={item => item.location.name}
        renderItem={({item}) => <WeatherCard weatherData={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
});

export default FavouritesScreen;
