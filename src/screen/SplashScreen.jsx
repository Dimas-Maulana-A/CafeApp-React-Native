import {StyleSheet, Text, View, Image} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect} from 'react';

import {getItem} from '../utils';

const SplashScreen = () => {
  const focused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => CheckerLogin(), 1000);
  }, [focused]);

  const CheckerLogin = async () => {
    const data = await getItem('@storage_data');
    const token = await getItem('@storage_token');
    console.log('data', data);

    try {
      if (data !== null && token !== null) {
        const datas = JSON.parse(data)
        if (datas.role === 1) {
          navigation.navigate('Developer');
        } else if (datas.role === 2) {
          navigation.navigate('Admin');
        } else if (datas.role === 3) {
          navigation.navigate('Kasir');
        }
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6777CC', '#131466']}
        start={{x: 1, y: 0.3}}
        end={{x: 0, y: 0.8}}
        style={styles.gradient}>
        <Text style={styles.cafeText}>CafeApp</Text>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cafeText: {
    fontSize: 45,
    color: 'white',
    fontWeight: 'bold',
  },
});
