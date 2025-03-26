import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator, 
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBarComponent from '../components/SearchBarComponent';
import SevenDayWeatherCard from '../components/SevenDayWeatherCard';
import { useWeather } from '../context/WeatherContext';
import { getWeatherBackground } from '../utils/weatherBackground';
import { BlurView } from '@react-native-community/blur';
import GestureRecognizer from 'react-native-swipe-gestures';

const HomeScreen = () => {
  const { weatherData, setSelectedCity, loadingWeather } = useWeather();
  const navigation = useNavigation();

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
        <ScrollView contentContainerStyle={styles.overlay} >
          <SearchBarComponent onCitySelect={setSelectedCity} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Favourites')}>
            <Text style={styles.buttonText}>Go to Favourites</Text>
          </TouchableOpacity>

          <View style={styles.container}>
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
                <TouchableOpacity
                  style={styles.weatherButton}
                  onPress={() => navigation.navigate('WebViewScreen')}>
                  <Image
                    source={require('../assets/weatherchannellogo.png')}
                    style={styles.weatherIcon}
                  />
                </TouchableOpacity>
                <Button onPress={() => navigation.navigate('WebViewInteractive')} title="Go to Website Documentation" />
              </View>

            ) : (
              <Text style={styles.errorText}>No weather data available.</Text>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
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
    flexGrow: 1,
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
  weatherButton: {
    alignSelf: 'center',
    marginVertical: 15,
    backgroundColor: '#ffffff',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
