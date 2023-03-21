import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={async()=> {
        await AsyncStorage.clear()
        navigation.navigate("Login")
      }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})