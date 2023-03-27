import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {auth, baseMenu} from '../../../../../utils';
import {Question} from '../../../../../assets';
import {
  Templates,
  Column,
  Rows,
  PrimaryButtons,
} from '../../../../../components';

const DetailsMenuAdmin = ({route}) => {
  const [data, setData] = useState('');
  const [image, setImage] = useState('');
  const {menuId} = route.params;
  const focused = useIsFocused();

  useEffect(() => {
    handleGetData();
  }, [focused]);

  const handleGetData = () => {
    auth
      .get(baseMenu + menuId)
      .then(async result => {
        const datas = result.data.data;
        setData(result.data.data);
        console.log(result.data);
        auth
          .get(baseMenu + 'image/' + datas.image)
          .then(result => {
            setImage(true);
          })
          .catch(err => {
            setImage(false);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <View style={styles.Content}>
          {image ? (
            <Image
              source={{uri: baseMenu + 'image/' + data.image}}
              style={{
                height: '100%',
                width: '100%',
              }}
              resizeMode="contain"
            />
          ) : (
            <Column
              c_Style={{
                alignItems: 'center',
              }}>
              <Image
                source={Question}
                style={{
                  tintColor: 'silver',
                }}
                resizeMode="contain"
              />
              <Text>Image Not Found</Text>
            </Column>
          )}
        </View>
        <Column>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: 'black',
              paddingVertical: 10,
            }}>
            {data.name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'red',
              fontWeight: 'bold',
            }}>
            {data.harga}
          </Text>
          <Text
            style={{
              color: 'black',
            }}>
            Description : {data.description}
          </Text>
          <Text
            style={{
              color: 'black',
            }}>
            Category : {data.categorys ? data.categorys.name : data.category}
          </Text>
        </Column>
      </Templates>
    </View>
  );
};

export default DetailsMenuAdmin;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  Content: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: '100%',
    height: 300,
  },
});
