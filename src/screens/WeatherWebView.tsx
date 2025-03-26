import { View, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const WeatherWebView = () => {
    const navigation = useNavigation();
    const onSwipeRight = () => {
        navigation.navigate('Home');
    };

    return (
    <GestureRecognizer
      onSwipeLeft={onSwipeRight}
      style={styles.gestureContainer}
    >
      <View style={styles.container}>
        <WebView 
          source={{ uri: 'https://www.weather.com' }} 
          style={styles.webview}
        />
      </View>
      </GestureRecognizer>
    );
  };
  
  const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1,
      },
    container: {
      flex: 1,
    },
    webview: {
      flex: 1,
    },
  });
  
  export default WeatherWebView;