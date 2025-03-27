import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import WeatherWebView from './src/screens/WeatherWebView';
import { WeatherProvider } from './src/context/WeatherContext';
import WebViewInteractive from './src/screens/WebViewInteractive';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['https://weatherapp.com', 'weatherapp://'],
  config: {
    screens: {
      Home: '',
      Favourites: 'favourites',
      WeatherWebView: 'weatherchannel',
      WebViewInteractive: 'interactive',
    },
  },
};

const App = () => {
  return (
    <WeatherProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Favourites"
            options={{ headerTitle: '' }}
            component={FavouritesScreen}
          />
          <Stack.Screen
            name="WeatherWebView"
            options={{ headerTitle: '' }}
            component={WeatherWebView}
          />
          <Stack.Screen
            name="WebViewInteractive"
            options={{ headerTitle: '' }}
            component={WebViewInteractive}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  );
};

export default App;
