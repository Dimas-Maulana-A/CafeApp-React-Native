import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {KasirHomeScreen, KasirProfileScreen} from '../../pages';
import CustomCenterRound from './CustomCenterRound';

import {
  HomeBold,
  HomeLight,
  AddTrans,
  ProfileBold,
  ProfileLight,
} from '../../../assets';

const Tab = createBottomTabNavigator();

function TabsBottomKasir() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreenKasir"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let Icons;

          if (route.name === 'HomeScreenKasir') {
            Icons = focused ? HomeBold : HomeLight;
          } else if (route.name === 'ProfileScreenKasir') {
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
        name="HomeScreenKasir"
        component={KasirHomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TransScreenKasir"
        component={KasirHomeScreen}
        options={{
          title: 'Transaction',
          tabBarIcon: ({focused, size}) => (
            <Image
              source={AddTrans}
              resizeMode="contain"
              style={{
                width: size,
                height: size,
                tintColor: '#fff',
              }}
            />
          ),
          tabBarButton: props => <CustomCenterRound {...props} />,
        }}
      />
      <Tab.Screen
        name="ProfileScreenKasir"
        component={KasirProfileScreen}
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabsBottomKasir;

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
