import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import {WeatherProvider} from './src/context/WeatherContext';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Favourites" component={FavouritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  );
};

export default App;
