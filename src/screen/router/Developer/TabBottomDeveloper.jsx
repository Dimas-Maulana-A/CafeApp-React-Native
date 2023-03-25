import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator()

import HomeScreen from "../../pages/HomeScreen";

function TabsDeveloper() {
  return (
    <Tab.Navigator initialRouteName="SettingScreenDev">
      <Tab.Screen
        name="HomeScreenDev"
        component={HomeScreen}
        options={{
          // title: 'Home',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen name="SettingScreenDev" component={HomeScreen} />
      <Tab.Screen name="ProductScreenDev" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default TabsDeveloper