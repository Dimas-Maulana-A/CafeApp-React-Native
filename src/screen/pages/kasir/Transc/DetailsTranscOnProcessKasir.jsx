import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {auth, baseTransaksi} from '../../../../utils';
import {
  Templates,
  PrimaryButtons,
  Column,
  Rows,
  Space,
} from '../../../../components';

const DetailsTranscOnProcessKasir = ({route}) => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [details, setDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const {transcId} = route.params;
  const focused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    handleGetTransaction();
  }, [focused]);

  const handleGetTransaction = () => {
    auth
      .get(baseTransaksi + transcId)
      .then(result => {
        const data = result.data ? result.data.data : result.data;
        let date = new Date(data.tgl_transaksi);
        let options = {year: 'numeric', month: 'long', day: 'numeric'}
        setDate(date.toLocaleDateString('en-EN', options));
        const transc = [];
        transc.push(data);
        setData(transc);
        setDetails(data.detail_transaksi);

        let totalHarga = 0;
        data.detail_transaksi.forEach(item => {
          totalHarga += item.total_harga;
        });
        setTotalPrice(totalHarga);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdateStatus = ()=> {
    auth.put(baseTransaksi+transcId)
    .then(result=> {
      navigation.navigate('Kasir')
    })
    .catch(err=> {
      console.log(err)
    })
  }

  return (
    <View style={styles.Container}>
      {data.map((item, i) => (
        <Templates m_Horizontal={'5%'} m_Vertical={'5%'} key={i}>
          <Column
            c_Style={{
              height: '100%',
              justifyContent: 'space-between',
            }}>
            <Column>
              <Rows c_Style={styles.InvoiceHeader}>
                <Text style={styles.InvoiceTitle}>Invoice</Text>
                <Text style={styles.InvoiceUsers}>{item.nama_pelanggan}</Text>
              </Rows>
              <Rows
                c_Style={[
                  {
                    justifyContent: 'space-between',
                  },
                  styles.InvoiceHeader2,
                ]}>
                <Text style={styles.InvoiceHeaderData2}>{date}</Text>
                <Text style={styles.InvoiceHeaderData2}>
                  Meja :{' '}
                  {item.meja_pelanggan
                    ? item.meja_pelanggan.nomor_meja
                    : item.id_meja}
                </Text>
                <Text style={styles.InvoiceHeaderData2}>{item.status}</Text>
              </Rows>
              <View style={styles.listProduct}>
                {details
                  ? details.map((d, i) => (
                      <Rows
                        key={i}
                        c_Style={{
                          justifyContent: 'space-between',
                          paddingVertical: 5
                        }}>
                        <Text>
                          {d.details_menu ? d.details_menu.name : d.id_menu}
                        </Text>
                        <Rows
                          c_Style={{
                            justifyContent: 'space-between',
                          }}>
                          <Text>{d.total_barang}</Text>
                          <Space />
                          <Text>{d.harga}</Text>
                          <Space />
                          <Text>{d.total_harga}</Text>
                        </Rows>
                      </Rows>
                    ))
                  : ''}
              </View>

              {/* Total Harga */}
                <Rows
                  c_Style={{
                    justifyContent: 'space-between',
                    paddingVertical: 10
                  }}>
                  <Text>payment method : {item.metode_pembayaran}</Text>
                  <Text>Total : {totalPrice}</Text>
                </Rows>
            </Column>
            <PrimaryButtons title="Done" onPressed={()=> handleUpdateStatus()} c_Style={{
              fontWeight: 'bold',
            }} />
          </Column>
        </Templates>
      ))}
    </View>
  );
};

export default DetailsTranscOnProcessKasir;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  InvoiceHeader: {
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },

  InvoiceTitle: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
  },

  InvoiceUsers: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
  },

  InvoiceHeader2: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },

  InvoiceHeaderData2: {
    fontSize: 15,
  },

  listProduct: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
