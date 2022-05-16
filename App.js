import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import MapScreen from './src/screens/MapScreens';

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <MapScreen/>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}


