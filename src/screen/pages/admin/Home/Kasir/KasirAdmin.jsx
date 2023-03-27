import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {
  Templates,
  PrimaryButtons,
  Space,
  Column,
  Rows,
} from '../../../../../components';
import {DeleteLight, EditLight} from '../../../../../assets';
import {auth, baseKasir} from '../../../../../utils';

const KasirAdmin = () => {
  const [data, setData] = useState([]);
  const focused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    handleGetKasir();
  }, [focused]);

  const handleGetKasir = () => {
    auth
      .get(baseKasir)
      .then(result => {
        const results = result.data ? result.data.data : result.data;
        setData(results);
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteKasir = itemId => {
    auth
      .delete(baseKasir + itemId)
      .then(result => {
        alert('data was deleted');
        handleGetKasir();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <PrimaryButtons
          title="Add Kasir"
          c_Style={styles.addKasir}
          onPressed={() => navigation.navigate('AddKasirAdmin')}
        />
        <Space Height={15} />
        {data
          .filter(item => item.role !== 1)
          .map((item, i) => (
            <View key={i}>
              <Rows c_Style={styles.listCard}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailsKasirAdmin', {
                      kasirId: item.id,
                    })
                  }>
                  <Text style={styles.listKasir}>{item.username}</Text>
                </TouchableOpacity>
                <Rows
                  c_Style={{
                    marginVertical: 'auto',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditKasirAdmin', {
                        idKasir: item.id,
                      })
                    }>
                    <Image
                      source={EditLight}
                      resizeMode="contain"
                      style={styles.Images}
                    />
                  </TouchableOpacity>
                  <Space Width={15} />
                  <TouchableOpacity onPress={() => deleteKasir(item.id)}>
                    <Image
                      source={DeleteLight}
                      resizeMode="contain"
                      style={styles.Images}
                    />
                  </TouchableOpacity>
                </Rows>
              </Rows>
              <Space Height={15} />
            </View>
          ))}
      </Templates>
    </ScrollView>
  );
};

export default KasirAdmin;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  addKasir: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  listCard: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  listKasir: {
    color: '#000',
    fontSize: 20,
  },

  Images: {
    height: 30,
    width: 30,
  },
});
