import React from 'react';
import {ScrollView, Text, StyleSheet, Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchBarComponent from '../components/SearchBarComponent';
import SevenDayWeatherCard from '../components/SevenDayWeatherCard';
import {useWeather} from '../context/WeatherContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const {selectedCity, weatherData, setSelectedCity} = useWeather();
  const navigation = useNavigation();

  return (
    <ScrollView>
      <SearchBarComponent onCitySelect={setSelectedCity} />
      <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>
            {selectedCity ? `Weather in ${selectedCity}` : 'Search for a city'}
          </Text>
          
          {weatherData ? (
            <SevenDayWeatherCard weatherData={weatherData} />
          ) : (
            <Text style={styles.errorText}>No weather data available.</Text>
          )}
          <Button
            title="Go to Favourites"
            onPress={() => navigation.navigate('Favourites')}
          />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#fff'},
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  errorText: {color: 'red', marginTop: 10},
});

export default HomeScreen;
