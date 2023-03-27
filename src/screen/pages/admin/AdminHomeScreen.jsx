import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {Category, Menu, Kasirs, Table, Roles} from '../../../assets';
import {Templates, Column, Rows} from '../../../components';
import {getItem, auth, baseKasir, baseTransaksi} from '../../../utils';

const AdminHomeScreen = () => {
  const [trans, setTrans] = useState([]);
  const [data, setData] = useState('');
  // const [userId, setUserId] = useState('');
  const focused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    localData();
    handleGetTransc();
  }, [focused]);

  const localData = async () => {
    const datas = JSON.parse(await getItem('@storage_data'));
    try {
      if (datas == null) {
        navigation.navigate('Login');
      } else {
        auth
          .get(baseKasir + datas.id)
          .then(result => {
            setData(result.data ? result.data.data : result.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    } catch (error) {
      navigation.navigate('Login');
    }
  };

  const handleGetTransc = () => {
    auth
      .get(baseTransaksi)
      .then(result => {
        setTrans(result.data ? result.data.data : result.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.headerHome}>Hello {data.name}</Text>
      <View style={styles.boxHome}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CategoryMenuAdmin')}>
          <Image
            source={Category}
            alt="Category Icon"
            style={styles.menuImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MenuAdmin')}>
          <Image source={Menu} alt="Menu Icon" style={styles.menuImage} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminRole')}>
          <Image source={Roles} alt="Trans Icon" style={styles.menuImage} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('KasirAdmin')}>
          <Image source={Kasirs} alt="Trans Icon" style={styles.menuImage} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TableAdmin')}>
          <Image source={Table} alt="Trans Icon" style={styles.menuImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.boxHistory}>
        <Text style={styles.textHistory}>Transaction</Text>
        <ScrollView>
          <Templates m_Horizontal={'5%'}>
            {/* <Column> */}
            {trans
              .filter(item => item.status === 'on process')
              .map((item, i) => {
                let date = new Date(item.tgl_transaksi);
                let options = {year: 'numeric', month: 'long', day: 'numeric'};
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      navigation.navigate('DetailsHistoryAdmin', {
                        transcId: item.id,
                      })
                    }>
                    <Rows c_Style={styles.listHistory}>
                      <Column>
                        <Text style={styles.headerHistory}>
                          {item.nama_pelanggan}
                        </Text>
                        <Text>
                          Date : {date.toLocaleDateString('en-EN', options)}
                        </Text>
                        <Text>
                          Table Number : {item.meja_pelanggan.nomor_meja}
                        </Text>
                      </Column>
                      <Text>{item.status}</Text>
                    </Rows>
                  </TouchableOpacity>
                );
              })}
            {/* </Column> */}
          </Templates>
        </ScrollView>
      </View>
    </View>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    flex: 1,
  },

  headerHome: {
    margin: '5%',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },

  boxHome: {
    marginHorizontal: '5%',
    paddingVertical: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  menuImage: {
    height: 35,
    width: 35,
  },

  boxHistory: {
    flex: 1,
    // padding: '5%',
    paddingBottom: 80,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: '5%',
    // flexDirection: 'row',
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  textHistory: {
    marginLeft: '5%',
    marginTop: '5%',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 10,
  },

  listHistory: {
    justifyContent: 'space-between',
    borderBottomColor: 'silver',
    borderBottomWidth: 2,
    marginVertical: 10,
    paddingBottom: 10,
  },

  headerHistory: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
