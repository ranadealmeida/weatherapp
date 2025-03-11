import React from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {useWeather} from '../context/WeatherContext';
import WeatherCard from '../components/WeatherCard';

const FavouritesScreen: React.FC = () => {
  const { favoriteCitiesWeather } = useWeather();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Cities</Text>
      <SafeAreaView>
        <ScrollView>
          {favoriteCitiesWeather.map(weatherData => (
            <WeatherCard
              key={weatherData.location.name}
              weatherData={weatherData}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
});

export default FavouritesScreen;
