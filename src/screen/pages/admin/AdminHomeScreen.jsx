import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

import {Templates} from '../../../components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { auth, baseKasir, getItem } from '../../../utils';

const AdminHomeScreen = () => {
  const [data, setData] = useState()
  const focused = useIsFocused()
  const navigation = useNavigation()

  useEffect(()=> {
    localData()
  }, [focused])

  const localData = async()=> {
    const datas  = JSON.parse(await getItem('@storage_data'))
    try {
      if(datas == null){
        navigation.navigate('Login')
      }else{
        auth.get(baseKasir+datas.id)
        .then(result=> {
          setData(result.data ? result.data.data : result.data)
        })
        .catch(err=> {
          console.log(err)
        })
      }
    } catch (error) {
      navigation.navigate("Login")
    }

  }

  return (
    <View style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <Text>Hallo {data ? data.name : data}</Text>
      </Templates>
    </View>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
