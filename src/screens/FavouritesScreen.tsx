import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useWeather } from '../context/WeatherContext';
import WeatherCard from '../components/WeatherCard';
import { useNavigation } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';

const FavouritesScreen: React.FC = () => {
  const { favoriteCitiesWeather } = useWeather();
  const navigation = useNavigation();
  
  const onSwipeRight = () => {
    navigation.navigate('Home');
  };

  return (
    <GestureRecognizer
      onSwipeRight={onSwipeRight}
      style={styles.gestureContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Favourite Cities</Text>
        <ScrollView>
          {favoriteCitiesWeather.map(weatherData => (
            <WeatherCard
              key={weatherData.location.name}
              weatherData={weatherData}
            />
          ))}
        </ScrollView>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  gestureContainer: { flex: 1, },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});

export default FavouritesScreen;
