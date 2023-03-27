import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';

import {
  AdminHomeScreen,
  AdminLogsScreen,
  AdminProfileScreen,
  AdminReportScreen,
  AdminTranscScreen,
} from '../../pages/admin';

const Tab = createBottomTabNavigator();

import {
  HomeBold,
  HomeLight,
  BugIcons,
  BugIconsLight,
  LogsBold,
  LogsLight,
  ProfileBold,
  ProfileLight,
  Trans,
  TransLight,
} from '../../../assets';

function TabsAdmin() {
  return (
    <Tab.Navigator
      initialRouteName="ProductScreenAdmin"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let Icons;

          if (route.name === 'HomeScreenAdmin') {
            Icons = focused ? HomeBold : HomeLight;
          } else if (route.name === 'HistoryScreenAdmin') {
            Icons = focused ? Trans : TransLight;
          } else if (route.name === 'AdminReportScreen') {
            Icons = focused ? BugIcons : BugIconsLight;
          } else if (route.name === 'AdminLogsScreen') {
            Icons = focused ? LogsBold : LogsLight;
          } else if (route.name === 'AdminProfileScreen') {
            Icons = focused ? ProfileBold : ProfileLight;
          }
          return (
            <Image
              source={Icons}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyles,
      })}>
      <Tab.Screen
        name="HomeScreenAdmin"
        component={AdminHomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="HistoryScreenAdmin"
        component={AdminTranscScreen}
        options={{
          title: 'History',
        }}
      />
      <Tab.Screen
        name="AdminReportScreen"
        component={AdminReportScreen}
        options={{
          title: 'Report',
        }}
      />
      <Tab.Screen
        name="AdminLogsScreen"
        component={AdminLogsScreen}
        options={{
          title: 'Logs Kasir',
        }}
      />
      <Tab.Screen
        name="AdminProfileScreen"
        component={AdminProfileScreen}
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabsAdmin;

const styles = StyleSheet.create({
  tabBarStyles: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 10,
    height: 60,
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
});
