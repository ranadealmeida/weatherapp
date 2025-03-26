import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import WeatherWebView from './src/screens/WeatherWebView';
import { WeatherProvider } from './src/context/WeatherContext';
import WebViewInteractive from './src/screens/WebViewInteractive';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="Favourites" options={{ headerTitle: '' }} component={FavouritesScreen} />
          <Stack.Screen name="WebViewScreen" options={{ headerTitle: '' }} component={WeatherWebView} />
          <Stack.Screen name="WebViewInteractive" options={{ headerTitle: '' }} component={WebViewInteractive} />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  );
};

export default App;
