import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import {
  DeveloperHomeScreen,
  DeveloperProfileScreen,
  DeveloperReportFinished,
} from '../../pages/developer';
import {
  BugIcons,
  BugIconsLight,
  HomeBold,
  HomeLight,
  ProfileBold,
  ProfileLight,
} from '../../../assets';

function TabsDeveloper() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreenDev"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let Icons;

          if (route.name === 'HomeScreenDev') {
            Icons = focused ? HomeBold : HomeLight;
          } else if (route.name === 'ReportFinishedDevelopment') {
            Icons = focused ? BugIcons : BugIconsLight;
          } else if (route.name === 'ProfileScreenDev') {
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
        name="HomeScreenDev"
        component={DeveloperHomeScreen}
        options={{
          title: 'Home',
          // headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="ReportFinishedDevelopment"
        component={DeveloperReportFinished}
        options={{
          title: 'Finished Report',
          // headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="ProfileScreenDev"
        component={DeveloperProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export default TabsDeveloper;

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
