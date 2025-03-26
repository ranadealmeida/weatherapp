import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewInteractive = () => {
    const handleMessage = (event: any) => {
        Alert.alert("Message from WebView:", event.nativeEvent.data);
    };

    return (
        <View style={styles.container}>
            <WebView 
                source={{ html: `
                    <html>
                        <body>
                            <h1>Click the button</h1>
                            <button onClick="sendMessage()">Send Message</button>
                            <script>
                                function sendMessage() {
                                    window.ReactNativeWebView.postMessage('Hello from WebView!');
                                }
                            </script>
                        </body>
                    </html>
                `}}
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
