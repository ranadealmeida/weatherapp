import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'WebView'>;

const WebViewScreen: React.FC<Props> = ({ route }) => {
  const { url, isInternal } = route.params;

  const source = isInternal
  ? Platform.OS === 'ios'
    ? require('./../../webpages/internal.html')
    : { uri: `file:///android_asset/${url}` }
  : { uri: url };

  return (
    <View style={styles.container}>
      {isInternal && Platform.OS === 'ios' ? (
        <WebView
          originWhitelist={['*']}
          source={source}
          style={styles.webview}
        />
      ) : (
        <WebView
          source={source}
          style={styles.webview}
          startInLoadingState={true}
        />
      )}
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

export default WebViewScreen;