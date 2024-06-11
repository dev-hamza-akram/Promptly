import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import homeIcon from './assets/home';
import moreIcon from './assets/more';
import notificationIcon from './assets/notification';

import More from './More';
import Notifications from './Notifications';
import Home from './ReminderDashboard';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabBarIcon({component: Component, color, size}) {
  return <Component width={size} height={size} style={{tintColor: color}} />;
}

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSize = focused ? 32 : 27;
          let IconComponent;
          switch (route.name) {
            case 'Home':
              IconComponent = homeIcon;
              break;
            case 'More':
              IconComponent = moreIcon;
              break;
            case 'Notifications':
              IconComponent = notificationIcon;
              break;
           
          }
          return (
            <TabBarIcon
              component={IconComponent}
              color={color}
              size={iconSize}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: 'white',
          borderTopColor: '#dfe1e5',
          shadowOpacity: 0.1,
          shadowRadius: 5,
          shadowColor: 'black',
          shadowOffset: {height: -5, width: 0},
          paddingHorizontal: 20,
        },
      })}>
    
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 18,
  },
});

export default Navigation;
