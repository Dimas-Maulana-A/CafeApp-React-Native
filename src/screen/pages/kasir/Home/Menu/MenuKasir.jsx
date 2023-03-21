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
import {auth, baseMenu} from '../../../../../utils';

const MenuKasir = () => {
  const [data, setData] = useState([]);
  const focused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    handleGetMenu();
  }, [focused]);

  const handleGetMenu = () => {
    auth
      .get(baseMenu)
      .then(result => {
        const results = result.data ? result.data.data : result.data;
        setData(results);
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteMenu = itemId => {
    auth
      .delete(baseMenu + itemId)
      .then(result => {
        alert('data was deleted');
        handleGetMenu();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <PrimaryButtons
          title="Add Menu"
          c_Style={styles.addMenu}
          onPressed={() => navigation.navigate('AddMenuKasir')}
        />
        <Space Height={15} />
        {data.map((item, i) => (
          <View key={i}>
            <Rows c_Style={styles.listCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailsMenuKasir', {
                    menuId: item.id,
                  })
                }>
                <Text style={styles.listMenu}>{item.name}</Text>
              </TouchableOpacity>
              <Rows
                c_Style={{
                  marginVertical: 'auto',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditMenuKasir', {
                      idCategoryMenu: item.id,
                    })
                  }>
                  <Image
                    source={EditLight}
                    resizeMode="contain"
                    style={styles.Images}
                  />
                </TouchableOpacity>
                <Space Width={15} />
                <TouchableOpacity onPress={() => deleteMenu(item.id)}>
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

export default MenuKasir;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  addMenu: {
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

  listMenu: {
    color: '#000',
    fontSize: 20,
  },

  Images: {
    height: 30,
    width: 30,
  },
});
