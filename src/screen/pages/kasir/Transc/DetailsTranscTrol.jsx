import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

import {
  PrimaryButtons,
  Space,
  Templates,
  Input,
  Rows,
  Modals,
} from '../../../../components';
import {
  auth,
  baseCheckout,
  baseTransaksi,
  fsGetData,
  getItem,
} from '../../../../utils';
import {EditLight, DeleteLight, Close} from '../../../../assets';

const DetailsTranscTrol = ({route}) => {
  const [troll, setTroll] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [amountItem, setAmountItem] = useState('');
  const [clientName, setClientName] = useState('');
  const [payment, setPayment] = useState('');
  const [idMeja, setIdMeja] = useState('');
  const [menuId, setMenuId] = useState();
  const [dataId, setDataId] = useState();

  const {user_id} = route.params;
  const focused = useIsFocused();
  const navigation = useNavigation()

  console.log(amountItem);

  useEffect(() => {
    handleGetTroll();
  }, [focused]);

  const handleGetTroll = async () => {
    auth
      .get(baseCheckout + user_id)
      .then(result => {
        setTroll(result.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEditTroll = async () => {
    auth
      .put(baseCheckout + dataId, {
        id_menu: menuId,
        total_barang: amountItem,
      })
      .then(result => {
        setModalEdit(false);
        handleGetTroll();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleDelTroll = async selectedId => {
    auth
      .delete(baseCheckout + selectedId)
      .then(result => {
        handleGetTroll();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handlePostTransc = async e => {
    e.preventDefault();
    auth
      .post(baseTransaksi, {
        id_kasir: user_id,
        nama_pelanggan: clientName,
        id_meja: 1,
        metode_pembayaran: payment,
        details: troll,
      })
      .then(result => {
        auth
          .delete(baseCheckout + `all/${user_id}`)
          .then(result => {
            console.log(result);
            alert('saved transactions');
            handleGetTroll();
            navigation.navigate('Kasir')
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <View style={styles.boxInput}>
        <Input
          Value={clientName}
          on_Change={text => setClientName(text)}
          placeHolder="enter client name"
          c_Style={{
            borderRadius: 20,
            padding: 10,
            fontSize: 18,
          }}
        />
        <Space />
        <View style={styles.paymentPicker}>
          <Picker
            selectedValue={payment}
            onValueChange={valueItem => {
              setPayment(valueItem);
            }}>
            <Picker.Item value={'cash'} label={'cash'} />
            <Picker.Item value={'qrcode'} label={'qrcode'} />
          </Picker>
        </View>
      </View>

      <View style={styles.menuCard}>
          <ScrollView>
            <Templates m_Vertical={'5%'} m_Horizontal={'5%'}>
              {troll.map((item, i) => (
                <View key={i} style={styles.boxMenu}>
                  <Rows
                    c_Style={{
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        {item.data_menu.name}
                      </Text>
                      <Text>
                        {item.data_menu.harga} * {item.total_barang} ={' '}
                        {item.total_harga}{' '}
                      </Text>
                    </View>
                    <Rows
                      c_Style={{
                        alignSelf: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setAmountItem(item.total_barang.toString());
                          setMenuId(item.id_menu);
                          setDataId(item.id);
                          setTimeout(() => {
                            setModalEdit(true);
                          }, 200);
                        }}>
                        <Image source={EditLight} style={styles.imageControl} />
                      </TouchableOpacity>
                      <Space width={15} />
                      <TouchableOpacity onPress={() => handleDelTroll(item.id)}>
                        <Image
                          source={DeleteLight}
                          style={styles.imageControl}
                        />
                      </TouchableOpacity>
                    </Rows>
                  </Rows>
                </View>
              ))}
            </Templates>
          <Space Height={70} />
          </ScrollView>
        <View
          style={{
            width: '100%',
            padding: 10,
            position: 'absolute',
            bottom: 0
          }}>
          <PrimaryButtons
            title="Save"
            onPressed={handlePostTransc}
            c_Style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}
          />
        </View>
      </View>
      <Modals
        visible={modalEdit}
        trans={true}
        animated="fade"
        c_Style={{
          padding: 20,
          borderRadius: 20,
          shadowOffset: {width: 4, height: 4},
          shadowColor: '#000',
          shadowOpacity: 0.9,
          shadowRadius: 2,
          elevation: 5,
        }}>
        <Rows
          c_Style={{
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
            }}>
            ID Product : {menuId}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalEdit(false);
              setAmountItem();
            }}>
            <Image
              source={Close}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
              }}
            />
          </TouchableOpacity>
        </Rows>
        <Space Height={20} />
        <Input
          c_Style={{
            borderRadius: 20,
            padding: 10,
            fontSize: 18,
          }}
          keyType="numeric"
          Value={amountItem}
          on_Change={text => setAmountItem(text)}
          placeHolder="enter the number of products"
        />
        <Space Height={20} />
        <PrimaryButtons
          c_Style={{
            fontSize: 20,
          }}
          title="Save"
          onPressed={() => {
            handleEditTroll();
            setModalEdit(false);
          }}
        />
      </Modals>
    </View>
  );
};

export default DetailsTranscTrol;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  boxInput: {
    padding: '5%',
  },

  paymentPicker: {
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  menuCard: {
    flex: 1,
    justifyContent: 'space-between',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: '#fff',
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  boxMenu: {
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    paddingVertical: 20,
  },

  imageControl: {
    width: 30,
    height: 30,
  },
});
