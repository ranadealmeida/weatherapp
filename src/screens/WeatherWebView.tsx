import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WeatherWebView = () => {
    return (
      <View style={styles.container}>
        <WebView 
          source={{ uri: 'https://www.weather.com' }} 
          style={styles.webview}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webview: {
      flex: 1,
    },
  });
  
  export default WeatherWebView;