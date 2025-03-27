import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewInteractive = () => {
  const handleMessage = (event: any) => {
    Alert.alert(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{
          html: `
                    <html>
                    <head>
                     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    text-align: center;
                                    padding: 20px;
                                    background-color: #f4f4f9;
                                }
                                h1 {
                                    font-size: 24px;
                                    color: #333;
                                }
                                button {
                                    padding: 10px 20px;
                                    font-size: 18px;
                                    color: #fff;
                                    background-color: #007BFF;
                                    border: none;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                }
                                button:hover {
                                    background-color: #0056b3;
                                }
                                button:active {
                                    background-color: #004085;
                                }
                            </style>
                            </head>
                        <body>
                            <h1>Welcome to the internal webview :)</h1>
                            <button onClick="sendMessage()">Click me!</button>
                            <script>
                                function sendMessage() {
                                    window.ReactNativeWebView.postMessage('Hahah nice it works!');
                                }
                            </script>
                        </body>
                    </html>
                `,
        }}
        onMessage={handleMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewInteractive;
