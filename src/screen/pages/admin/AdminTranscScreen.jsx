import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import { Templates, Rows, Column , Input, Space} from '../../../components';
import { auth, baseTransaksi, getItem } from '../../../utils';


const AdminTranscScreen = () => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState('');
    // const [testInput, setTesInput] = useState('')
    const focused = useIsFocused();
    const navigation = useNavigation();
  
    useEffect(() => {
      handleGetTransc();
      handleGetDataLocal();
    }, [focused]);
  
    const handleGetDataLocal = async () => {
      try {
        const dataUser = JSON.parse(await getItem('@storage_data'));
        if(dataUser === null){
            navigation.navigate('Login')
        }
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
          {/* <Input Value={testInput} on_Change={tx => setTesInput(tx)} /> */}
          {data
          // .filter(item => item.nama_pelanggan.toLowerCase().includes(testInput.toLowerCase()))
            .filter(item => item.status === 'success')
            .map((item, i) => {
              let date = new Date(item.tgl_transaksi);
              return (
                <View key={i} style={styles.Content}>
                  <TouchableOpacity style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }} onPress={()=> navigation.navigate('DetailsHistoryAdmin', {
                    transcId: item.id
                  })}>
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
            <Space Height={80} />
        </Templates>
      </ScrollView>
    )
}

export default AdminTranscScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    
      Content: {
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'silver'
      },
    
      NameText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
      }
})