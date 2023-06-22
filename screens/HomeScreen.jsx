import React from 'react'
import { Button, View } from 'react-native'

function HomeScreen ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Abrir Workflow" onPress={() => navigation.navigate('WebView')} />
    </View>
  )
}

export default HomeScreen
