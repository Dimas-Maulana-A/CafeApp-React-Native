import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {Templates, Rows, Column} from '../../../../../components';
import {auth, baseTransaksi, getItem} from '../../../../../utils';

const HistoryTransKasir = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const focused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    handleGetTransc();
    handleGetDataLocal();
  }, [focused]);

  const handleGetDataLocal = async () => {
    try {
      const dataUser = JSON.parse(await getItem('@storage_data'));
      setUserId(dataUser.id);
    } catch (error) {
      console.log(err);
    }
  };

  const handleGetTransc = () => {
    auth
      .get(baseTransaksi)
      .then(result => {
        setData(result.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        {data
          .filter(item => item.id_kasir === userId)
          .filter(item => item.status === 'success')
          .map((item, i) => {
            let date = new Date(item.tgl_transaksi);
            return (
              <View key={i}>
                <TouchableOpacity style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                  <Column>
                    <Text style={styles.NameText}>{item.nama_pelanggan}</Text>
                    <Text>Date : {date.toLocaleDateString()}</Text>
                    <Text>
                      Table :{' '}
                      {item.meja_pelanggan
                        ? item.meja_pelanggan.nomor_meja
                        : ''}
                    </Text>
                  </Column>
                  <Text>{item.status}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </Templates>
    </ScrollView>
  );
};

export default HistoryTransKasir;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  NameText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
