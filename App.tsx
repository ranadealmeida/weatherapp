import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import WebViewScreen from './src/screens/WebViewScreen'; // Add this import
import { WeatherProvider } from './src/context/WeatherContext';

// Define your RootStackParamList type
type RootStackParamList = {
  Home: undefined;
  Favourites: undefined;
  WebView: {
    url: string;
    isInternal: boolean;
    title?: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="Favourites" options={{ headerTitle: '' }} component={FavouritesScreen} />
          <Stack.Screen 
            name="WebView" 
            component={WebViewScreen}
            options={({ route }) => ({ 
              title: route.params.title || (route.params.isInternal ? 'Internal Page' : 'External Site'),
              headerShown: true 
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  );
};

export default App;