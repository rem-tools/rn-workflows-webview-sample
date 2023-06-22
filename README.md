# Workflows WebView React Native

Este proyecto _sample_ muestra cómo integrar un WebView para nuestra plataforma _Workflows_.
Se tiene que tener en cuenta que el proyecto está configurado para que funcione en Android y iOS.

## Instalación

Para instalar las dependencias del proyecto, ejecutar el siguiente comando:

```bash
yarn install
```

## Antes de comenzar

Modifica `WORKFLOW_URL` en el archivo `screens/WebViewScreen.jsx` con la URL de tu _Workflow_.

```javascript title="screens/WebViewScreen.jsx"
const WORKFLOW_URL = 'https://test.workflows.rem.tools/TOKEN';
```

Puedes agregar el query `minimal=true` en la URL para que el _Workflow_ se muestre sin el _header_ del UI.

```javascript title="screens/WebViewScreen.jsx"
const WORKFLOW_URL = 'https://test.workflows.rem.tools/TOKEN?minimal=true';
```

## Ejecución

Para ejecutar el proyecto, ejecutar el siguiente comando:

### Android

```bash
yarn run  android
```

### iOS

```bash
yarn run ios
```

## Notas

- Existe un [bug de Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=1401352#c12) que ocasiona que nuestro _Workflow_ se quede congelado, esto puede ser corregido,
    agregando el siguiente `injectedJavaScript` en el `WebView`:
    
    ```javascript title="WebView.jsx"
  
    // JavaScript que se inyecta en el WebView
    const INJECTED_JAVASCRIPT = `
        var spinner = document.createElement('div');
        spinner.setAttribute('class', 'spinner');
        document.body.insertBefore(spinner, document.body.firstChild);
        var style = document.createElement('style');
        style.innerHTML = '.spinner { position: absolute; top: 0; left: 0; z-index: 9999; border: 1px solid rgba(0,0,0,0.1); border-top-color: rgba(255,255,255,0.1); border-radius: 50%; width: 1px; height: 1px; animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    `;
  
    // Componente WebView
    <WebView
        ...
        injectedJavaScript={INJECTED_JAVASCRIPT}
        ...
    />
    ```

- Para que el WebView funcione correctamente en iOS, se tienen que agregar permisos de camara, archivos, ubicacion y audio en Android e iOS:
  **Para Android (AndroidManifest.xml):**
  ```xml title="AndroidManifest.xml"
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  ```
  **Para iOS (Info.plist):**
  ```xml title="Info.plist"
  <key>NSCameraUsageDescription</key>
  <string>Camera permission is required for barcode scanning.</string>
  <key>NSMicrophoneUsageDescription</key>
  <string>Microphone permission is required for audio recording.</string>
  <key>NSPhotoLibraryUsageDescription</key>
  <string>Photo Library permission is required for uploading images.</string>
  <key>NSLocationWhenInUseUsageDescription</key>
  <string>Location permission is required for geolocation.</string>
  <key>NSLocationAlwaysUsageDescription</key>
  <string>Location permission is required for geolocation.</string>
  ```
