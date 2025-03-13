import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useWeather } from '../context/WeatherContext';
import WeatherCard from '../components/WeatherCard';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const FavouritesScreen: React.FC = () => {
  const { favoriteCitiesWeather } = useWeather();
  const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > -50) {
        runOnJS(navigation.navigate)('Home');
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]}>
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
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  box: { flex: 1, },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});

export default FavouritesScreen;
