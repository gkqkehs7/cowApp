import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import AlertScreen from './screens/AlertScreen';
import CalenderScreen from './screens/CalenderScreen';
import AlertDateScreen from './screens/AlertDateScreen';
import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux'
import store from './store';


const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: 'black' },
  headerTitleStyle: { color:"white" },
  headerTintColor: "white",
}

export default function App() {

  return (
    <Provider store={store}>

      <NavigationContainer>
        <StatusBar style="light"/>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Alert" component={AlertScreen} />
          <Stack.Screen name="Calender" component={CalenderScreen} />
          <Stack.Screen name="AlertDate" component={AlertDateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
            
    </Provider>
  );
}


