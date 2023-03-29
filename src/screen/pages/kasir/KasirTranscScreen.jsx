import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';

import {
  Rows,
  Column,
  Modals,
  Input,
  Templates,
  Space,
  PrimaryButtons,
} from '../../../components';
import {Buy} from '../../../assets';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  auth,
  baseMenu,
  fsClearData,
  fsGetData,
  fsPostData,
  getItem,
} from '../../../utils';

const KasirTranscScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [itemId, setItemId] = useState();
  const [amountItem, setAmountItem] = useState();
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    localCheck();
    getProduct();
    // fsClearData(userId);
  }, [focused]);

  const localCheck = async () => {
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
        console.log(await fsGetData(userId));
        // await fsGetData(userId)
        // .then(result=> {
        //   console.log("data:",result)
        // })
        // .catch(err=> {
        //   console.log(err)
        // })
        // const file =
        //   RNFS.DocumentDirectoryPath + `/.storage_details_${userId}.json`;
        // RNFS.readFile(file, 'utf8')
        //   .then(result => {
        //     console.log(result);
        //   })
        //   .catch(err => {
        //     console.log('json not found');
        //   });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createTrans = async () => {
    try {
      await fsGetData(userId)
        .then(async content => {
          let data_details = JSON.parse(content);
          data_details.details.push({
            fs_id: Date.now(),
            id_menu: itemId,
            total_barang: amountItem,
          });
          var datas = JSON.stringify(data_details);
          await fsPostData(userId, datas)
            .then(result => {
              console.log('data saved');
            })
            .catch(err => {
              console.log('err :', err);
            });
        })
        .catch(async err => {
          var data_details = {
            details: [],
          };

          data_details.details.push({
            fs_id: Date.now(),
            id_menu: itemId,
            total_barang: amountItem,
          });

          var datas = JSON.stringify(data_details);
          await fsPostData(userId, datas)
            .then(result => {
              console.log('data saved');
            })
            .catch(err => {
              console.log('err :', err);
            });
        });
      // RNFS.readFile(file, 'utf8')
      //   .then(content => {
      //     let data_details = JSON.parse(content);

      // data_details.details.push({
      //   fs_id: Date.now(),
      //   id_menu: itemId,
      //   total_barang: amountItem,
      // });

      // var datas = JSON.stringify(data_details);
      //     const file =
      //       RNFS.DocumentDirectoryPath + `/.storage_details_${userId}.json`;

      //     RNFS.writeFile(file, datas, 'utf8')
      // .then(result => {
      //   console.log('data saved');
      // })
      // .catch(err => {
      //   console.log('err :', err);
      // });
      //   })
      //   .catch(err => {
      // var data_details = {
      //   details: [],
      // };

      // data_details.details.push({
      //   fs_id: Date.now(),
      //   id_menu: itemId,
      //   total_barang: amountItem,
      // });

      // var json = JSON.stringify(data_details);
      // const file =
      //   RNFS.DocumentDirectoryPath + `/.storage_details_${userId}.json`;

      // RNFS.writeFile(file, json, 'utf8')
      //   .then(result => {
      //     console.log('data saved');
      //   })
      //   .catch(err => {
      //     console.log('err :', err);
      //   });
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.Container}>
      <Rows c_Style={styles.HeaderContainer}>
        <Text style={styles.header}>Transaction</Text>
        <TouchableOpacity>
          <Image style={styles.headerImage} source={Buy} resizeMode="contain" />
        </TouchableOpacity>
      </Rows>
      {/* <PrimaryButtons
        title="Open Modal"
        onPressed={() => setModalVisible(true)}
      /> */}
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
      <Modals visible={modalVisible} animated="fade" trans={true}>
        <Text>Id Product : {itemId}</Text>
        <Input Value={amountItem} on_Change={text => setAmountItem(text)} />
        <PrimaryButtons
          title="Save"
          onPressed={() => {
            createTrans();
            setModalVisible(false);
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
