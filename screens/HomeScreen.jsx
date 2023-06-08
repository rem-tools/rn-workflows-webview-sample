import React from 'react'
import { Button } from 'react-native'

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Abrir WebView" onPress={() => navigation.navigate('WebView')} />
    </View>
  )
}

export default HomeScreen
