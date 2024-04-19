import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import Upload from './components/Screens/Upload';
import QnA from './components/Screens/QnA';
import Images from './components/Screens/Images';
import CameraScreen from './components/Screens/Camera';


const Tab = createMaterialBottomTabNavigator();

const TabBar = ({route, navigation}) => {

  const { userName } = route.params ?? null;

  return (
    <Tab.Navigator
      initialRouteName='Images'
      barStyle={{ backgroundColor: '#b31240' }} // Background color of the tab bar
      activeColor="#fff" // Color of the active tab (red)
      inactiveColor="#ffffff" // Color of inactive tabs (white)
      shifting={true} // Enables shifting animation for bottom tabs
    >
      <Tab.Screen
        name="Images"
        component={Images}
        options={{
          tabBarLabel: 'Images',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="collections"
              color={focused ? '#b31240' : 'white'} // Set icon color based on focus state
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ color, focused }) => (
          
            <MaterialCommunityIcons
              name="camera"
              color={focused ? '#b31240' : '#fff'} // Set icon color based on focus state
              size={26}
            />
          
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="cloud-upload"
              color={focused ? '#b31240' : 'white'} // Set icon color based on focus state
              size={26}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="QnA"
        component={QnA}
        options={{
          tabBarLabel: 'QnA',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account-question"
              color={focused ? '#b31240' : 'white'} // Set icon color based on focus state
              size={26}
            />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default TabBar;
