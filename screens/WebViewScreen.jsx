import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const WORKFLOW_URL = "";

// Extraer la JavaScript inyectada a una constante para mejor legibilidad y reutilización
const INJECTED_JAVASCRIPT = `
  var spinner = document.createElement('div');
  spinner.setAttribute('class', 'spinner');
  document.body.insertBefore(spinner, document.body.firstChild);
  var style = document.createElement('style');
  style.innerHTML = '.spinner { position: absolute; top: 0; left: 0; z-index: 9999; border: 1px solid rgba(0,0,0,0.1); border-top-color: rgba(255,255,255,0.1); border-radius: 50%; width: 1px; height: 1px; animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
  document.head.appendChild(style);
`;

const handleOnMessage = (event) => {
  console.log(event.nativeEvent.data);
};

const WebViewScreen = () => {
  return (
    <WebView
      source={{ uri: WORKFLOW_URL }}
      style={{ flex: 1 }}
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
      mixedContentMode="always"
      geolocationEnabled
      javaScriptEnabled
      domStorageEnabled
      allowFileAccess
      onMessage={handleOnMessage}
      injectedJavaScript={INJECTED_JAVASCRIPT}
    />
  );
};

export default WebViewScreen;
