import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import WeatherWebView from './src/screens/WeatherWebView';
import { WeatherProvider } from './src/context/WeatherContext';
import WebViewInteractive from './src/screens/WebViewInteractive';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

//'adb shell am start -W -a android.intent.action.VIEW -d "weatherapp://" com.weatherapp' to check the deep linking on the terminal, if succesful the app will switch to the page I link to

const linking = {
  prefixes: ['weatherapp://'],
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
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
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
