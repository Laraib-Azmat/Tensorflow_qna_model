import React from 'react';
import { StyleSheet, Text, View, Pressable, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabBar from './TabBar';
import Signup from './components/Signup';
import Signin from './components/Signin';

export default function App() {
  const Stack = createNativeStackNavigator();




  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Signin'>
        <Stack.Screen
          name='First'
          component={TabBar}
          options={({route, navigation})=>({
            headerStyle: { backgroundColor: '#b31240' },
            title: `Welcome ${route.params?.userName ?? ''}`,
            headerTintColor: '#fff',
            headerBackVisible: false,
            headerRight: () => (
              <Pressable
                style={{ marginRight: 10, backgroundColor: '#fff', padding: 5, borderRadius: 10 }}
                onPress={()=>navigation.navigate("Signin")}
              >
                <Text style={{ color: '#b31240', fontSize: 16, fontWeight: '700' }}>Signout</Text>
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name='Signin' options={{ headerShown: false }} component={Signin} />
        <Stack.Screen name='Signup' options={{ headerShown: false }} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
