import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Tabs Navigator
import TabsBottomKasir from './Kasir/TabsBottom';
import TabsDeveloper from './Developer/TabBottomDeveloper';
import TabsAdmin from './Admin/TabButtonsAdmin';

import {
  SplashScreen,
  LoginScreen,
  ReportKasir,
  ProfileKasir,
  ChangePasswordKasir,
  DetailsTranscOnProcessKasir,
  MenuKasir,
  AddMenuKasir,
  EditMenuKasir,
  DetailsMenuKasir,
  HistoryTransKasir,
  DetailsHistoryKasir,
  CategoryMenuKasir,
  AddCategoryMenuKasir,
  EditCategoryMenuKasir,
  ProfileAdmin,
  ReportAdmin,
  ChangePasswordAdmin,
  ReportDetailsAdmin,
  ProfileScreenDeveloper,
  ReportDetailsDeveloper,
} from '../pages';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Login Validation Screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* Kasir Screen */}

        <Stack.Screen
          name="Kasir"
          component={TabsBottomKasir}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ProfileKasir"
          component={ProfileKasir}
          options={{
            title: 'Profile',
          }}
        />

        <Stack.Screen
          name="ChangePasswordKasir"
          component={ChangePasswordKasir}
          options={{
            title: 'Profile',
          }}
        />

        <Stack.Screen
          name="ReportKasir"
          component={ReportKasir}
          options={{
            title: 'Report Bug',
          }}
        />

        <Stack.Screen
          name="DetailsTranscOnProcessKasir"
          component={DetailsTranscOnProcessKasir}
          options={{
            title: 'Transaction',
          }}
        />

        {/* HomeKasir */}

        <Stack.Screen
          name="CategoryMenuKasir"
          component={CategoryMenuKasir}
          options={{
            title: 'Category',
          }}
        />

        <Stack.Screen
          name="AddCategoryMenuKasir"
          component={AddCategoryMenuKasir}
          options={{
            title: 'Category',
          }}
        />

        <Stack.Screen
          name="EditCategoryMenuKasir"
          component={EditCategoryMenuKasir}
          options={{
            title: 'Category',
          }}
        />

        <Stack.Screen
          name="MenuKasir"
          component={MenuKasir}
          options={{
            title: 'Menu',
          }}
        />

        <Stack.Screen
          name="AddMenuKasir"
          component={AddMenuKasir}
          options={{
            title: 'Menu',
          }}
        />

        <Stack.Screen
          name="EditMenuKasir"
          component={EditMenuKasir}
          options={{
            title: 'Menu',
          }}
        />

        <Stack.Screen
          name="DetailsMenuKasir"
          component={DetailsMenuKasir}
          options={{
            title: 'Menu',
          }}
        />

        <Stack.Screen
          name="HistoryTransKasir"
          component={HistoryTransKasir}
          options={{
            title: 'History',
          }}
        />

        <Stack.Screen
          name="DetailsHistoryKasir"
          component={DetailsHistoryKasir}
          options={{
            title: 'Details',
          }}
        />

        {/* Admin Screen */}

        <Stack.Screen
          name="Admin"
          component={TabsAdmin}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ReportAdmin"
          component={ReportAdmin}
          options={{
            title: 'Report Bug',
          }}
        />

        <Stack.Screen
          name="ProfileAdmin"
          component={ProfileAdmin}
          options={{
            title: 'Profile',
          }}
        />

        <Stack.Screen
          name="ChangePasswordAdmin"
          component={ChangePasswordAdmin}
          options={{
            title: 'Profile',
          }}
        />

        <Stack.Screen
          name="ReportDetailsAdmin"
          component={ReportDetailsAdmin}
          options={{
            title: 'Details',
          }}
        />

        {/* Developer Screen */}

        <Stack.Screen
          name="Developer"
          component={TabsDeveloper}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ProfileScreenDeveloper"
          component={ProfileScreenDeveloper}
          options={{
            title: 'Profile',
          }}
        />

        <Stack.Screen
          name="ReportDetailsDeveloper"
          component={ReportDetailsDeveloper}
          options={{
            title: 'Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
