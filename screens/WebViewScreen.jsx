import React from 'react';
import { WebView } from 'react-native-webview';

const WORKFLOW_URL = "WORKFLOW_URL"; // Agregar ?minimal=true para quitar el header de la UI del workflow

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
  const { entity, value } = JSON.parse(event.nativeEvent.data)

  return entity === 'workflow' && value.status !== 'pristine';
};

function WebViewScreen ({ navigation }) {
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
      onMessage={(event) => {
        if (handleOnMessage(event)) {
          // Success or Error but going back to HomeScreen
          navigation.navigate('Home');
        } else {
          // Debugging
          console.log(event.nativeEvent.data);
        }
      }}

      // NOTA: inyectar este JavaScript en el WebView es necesario por si existe un error referente a este bug
      // https://bugs.chromium.org/p/chromium/issues/detail?id=1401352#c12
      injectedJavaScript={INJECTED_JAVASCRIPT}
    />
  );
}

export default WebViewScreen;
