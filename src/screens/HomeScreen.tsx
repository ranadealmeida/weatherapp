import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBarComponent from '../components/SearchBarComponent';
import SevenDayWeatherCard from '../components/SevenDayWeatherCard';
import { useWeather } from '../context/WeatherContext';
import { getWeatherBackground } from '../utils/weatherBackground';
import { BlurView } from '@react-native-community/blur';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import GestureRecognizer from 'react-native-swipe-gestures';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const { weatherData, setSelectedCity, loadingWeather } = useWeather();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const openInternalWebView = () => {
    navigation.navigate('WebView', { 
      url: 'webpages/internal.html',
      isInternal: true,
      title: 'App Documentation' 
    });
  };

  const openExternalWebView = () => {
    navigation.navigate('WebView', { 
      url: 'https://www.weatherapi.com/docs/',
      isInternal: false,
      title: 'Weather API Docs' 
    });
  };

  const onSwipeLeft = () => {
    navigation.navigate('Favourites');
  };
  
  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      style={styles.gestureContainer}
    >
      <ImageBackground
        source={
          weatherData
            ? getWeatherBackground(weatherData.current.condition.code)
            : require('../assets/default-background.jpg')
        }
        style={styles.backgroundImage}>
        <ScrollView style={styles.overlay} >
          <SearchBarComponent onCitySelect={setSelectedCity} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Favourites')}>
            <Text style={styles.buttonText}>Go to Favourites</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.container}>
            {loadingWeather ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : weatherData ? (
              <View>
                <BlurView
                  style={styles.blurContainer}
                  blurAmount={3}
                  blurType="light"
                >
                </BlurView>
                <SevenDayWeatherCard weatherData={weatherData} />
              </View>
            ) : (
              <Text style={styles.errorText}>No weather data available.</Text>
            )}
          </ScrollView>
          <TouchableOpacity
              style={styles.button}
              onPress={openInternalWebView}>
              <Text style={styles.buttonText}>Docs</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.button, {marginTop: 20}]}
              onPress={openExternalWebView}>
              <Text style={styles.buttonText}>API Docs</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
  },
  gestureContainer: {
    flex: 1,
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderColor: 'rgba(234, 234, 234, 0.1)',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    paddingTop: 65,
    backgroundColor: 'rgba(255, 255, 255  , 0.4)',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: { color: 'red', marginTop: 10 },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 20,
    borderColor: 'rgba(240, 240, 240, 0.8)',
    borderWidth: 1,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
