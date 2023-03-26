import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Rows, Column, Templates, Space} from '../../../../components';
import {Buy} from '../../../../assets';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {auth, baseMenu, getItem} from '../../../../utils';

const CreateTranscKasir = () => {
  const [product, setProduct] = useState([]);
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    localCheck();
    getProduct();
  }, [focused]);

  const localCheck = async () => {
    try {
      const local = JSON.parse(await getItem('@storage_data'));
      if (local === null) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = () => {
    auth
      .get(baseMenu)
      .then(result => {
        setProduct(result.data ? result.data.data : result.data);
        console.log(result.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <Rows c_Style={styles.HeaderContainer}>
        <Text style={styles.header}>Transaction</Text>
        <TouchableOpacity>
          <Image style={styles.headerImage} source={Buy} resizeMode="contain" />
        </TouchableOpacity>
      </Rows>
      <Templates m_Horizontal={'5%'}>
        {product.map((item, i) => (
          <View key={i}>
            <Rows
              c_Style={{
                flexWrap: 'wrap',
              }}>
              <View>
                <Text>{item.name}</Text>
              </View>
            </Rows>
          </View>
        ))}
      </Templates>
    </View>
  );
};

export default CreateTranscKasir;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  HeaderContainer: {
    justifyContent: 'space-between',
    padding: 20,
  },

  header: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },

  headerImage: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});
