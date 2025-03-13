import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBarComponent from '../components/SearchBarComponent';
import SevenDayWeatherCard from '../components/SevenDayWeatherCard';
import { useWeather } from '../context/WeatherContext';
import { getWeatherBackground } from '../utils/weatherBackground';
import { BlurView } from '@react-native-community/blur';
import { View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

const HomeScreen = () => {
  const { selectedCity, weatherData, setSelectedCity } = useWeather();
  const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < -50) { // Swipe left threshold
        runOnJS(navigation.navigate)('Favourites');
      }
      translateX.value = withSpring(0); // Reset position
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]}>
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
              {weatherData ? (
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
          </ScrollView>
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  box: {
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
    paddingTop: 60,
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
