import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  Rows,
  Column,
  Modals,
  Input,
  Templates,
  Space,
  PrimaryButtons,
} from '../../../components';
import {Buy, Buy2, Close} from '../../../assets';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {auth, baseCheckout, baseMenu, getItem} from '../../../utils';

const KasirTranscScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [itemId, setItemId] = useState();
  const [amountItem, setAmountItem] = useState();
  const [userId, setUserId] = useState('');
  const [troll, setTroll] = useState(false);
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    getLocal();
    getProduct();
    setTimeout(() => handleGetTroll(),200);
  }, [focused]);

  const getLocal = async () => {
    try {
      const local = JSON.parse(await getItem('@storage_data'));
      if (local === null) {
        navigation.navigate('Login');
      } else {
        setUserId(local.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = () => {
    auth
      .get(baseMenu)
      .then(async result => {
        setProduct(result.data ? result.data.data : result.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleGetTroll = () => {
    auth
      .get(baseCheckout + userId)
      .then(result => {
        console.log('err:', result.data.data[0]);
        if (result.data.data[0] !== undefined) {
          setTroll(true);
        } else {
          setTroll(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createTrans = async () => {
    try {
      auth
        .post(baseCheckout, {
          id_kasir: userId,
          id_menu: itemId,
          total_barang: amountItem,
        })
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.Container}>
      <Rows c_Style={styles.HeaderContainer}>
        <Text style={styles.header}>Transaction</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailsTranscTrol', {
              user_id: userId,
            })
          }>
          <Image
            style={styles.headerImage}
            source={troll ? Buy2 : Buy}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Rows>
      <ScrollView>
        <Templates m_Horizontal={'5%'} m_Vertical={'1%'}>
          <Input
            placeHolder={'search'}
            c_Style={styles.Search}
            Value={search}
            on_Change={text => setSearch(text)}
          />
          <Space Height={15} />
          <Rows c_Style={{flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {product
              .filter(
                item =>
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.description
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  item.harga
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  item.categorys.name
                    .toLowerCase()
                    .includes(search.toLowerCase()),
              )
              .map((item, i) => (
                <View key={i} style={styles.CardTrans}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: baseMenu + 'image/' + item.image}}
                      style={styles.imageTrans}
                    />
                  </View>
                  <View>
                    <Rows
                      c_Style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Column
                        c_Style={{
                          width: '60%',
                        }}>
                        <Text
                          style={styles.titleTrans}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.name}
                        </Text>
                        <Text style={styles.priceTrans}>{item.harga}</Text>
                      </Column>
                      <PrimaryButtons
                        title="Add"
                        c_Style={{
                          justifyContent: 'center',
                        }}
                        onPressed={() => {
                          setItemId(item.id);
                          console.log(item.id);
                          setModalVisible(true);
                        }}
                      />
                    </Rows>
                  </View>
                </View>
              ))}
          </Rows>
          <Space Height={80} />
        </Templates>
      </ScrollView>

      {/* Modals */}
      <Modals
        visible={modalVisible}
        animated="fade"
        trans={true}
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
            ID Product : {itemId}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
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
          on_Change={text => {
            if (/^\d+$/.test(text) || text === '') {
              setAmountItem(text);
            }
          }}
          placeHolder="enter the number of products"
        />
        <Space Height={20} />
        <PrimaryButtons
          c_Style={{
            fontSize: 20,
          }}
          title="Save"
          onPressed={() => {
            createTrans();
            setModalVisible(false);
            setTimeout(() => handleGetTroll(), 200);
            setTimeout(() => setAmountItem(), 1000);
          }}
        />
      </Modals>
    </View>
  );
};

export default KasirTranscScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  HeaderContainer: {
    justifyContent: 'space-between',
    padding: 15,
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

  Search: {
    borderRadius: 20,
    fontSize: 20,
    paddingHorizontal: 10,
  },

  CardTrans: {
    width: '48%',
    marginBottom: '4%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  imageContainer: {
    backgroundColor: '#fafafa',
    height: 120,
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },

  imageTrans: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },

  titleTrans: {
    fontSize: 20,
    color: 'black',
  },

  priceTrans: {
    fontSize: 16,
  },
});
