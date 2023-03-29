import {StyleSheet, Text, View, Linking, Platform, Image} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';

// import {BugIcons} from '../assets';
import {getItem} from '../utils';
// import {Modals, PrimaryButtons, Space} from '../components';

const SplashScreen = () => {
  // const [version, setVersion] = useState(1);
  // const [visible, setVisible] = useState(false);
  const focused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    // if (version < 1) {
    //   setTimeout(() => setVisible(true), 1000);
    // } else {
      setTimeout(() => CheckerLogin(), 1000);
    // }
  }, [focused]);

  const CheckerLogin = async () => {
    const data = await getItem('@storage_data');
    const token = await getItem('@storage_token');
    console.log('data', data);

    try {
      if (data !== null && token !== null) {
        const datas = JSON.parse(data);
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

  // Check Version

  // const Direct = () => {
  //   try {
  //     if (Platform.OS === 'android') {
  //       Linking.openURL('market://details?id=co.id.nagaexchange.app&hl=id');
  //     } else if (Platform.OS === 'ios') {
  //       Linking.openURL('itms-apps://itunes.apple.com/app/id1476523331?mt=8');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6777CC', '#131466']}
        start={{x: 1, y: 0.3}}
        end={{x: 0, y: 0.8}}
        style={styles.gradient}>
        <Text style={styles.cafeText}>CafeApp</Text>
      </LinearGradient>
      {/* <Modals
        visible={visible}
        animated={'fade'}
        trans={true}
        c_Style={{
          padding: 10,
          width: '50%',
          // alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 20,
        }}>
        <Image
          source={BugIcons}
          style={{
            alignSelf: 'center',
            width: 100,
            height: 100,
          }}
          resizeMode="contain"
        />
        <Space Height={18} />
        <Text
          style={{
            alignSelf: 'center',
          }}>
          New Version is Available
        </Text>
        <Space />
        <PrimaryButtons title="Upgrade" onPressed={() => Direct()} />
      </Modals> */}
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
