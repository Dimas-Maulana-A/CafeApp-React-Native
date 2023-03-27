import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {auth, baseKasir} from '../../../../../utils';
import {
  Templates,
  Column,
  Space,
  Rows,
  PrimaryButtons,
} from '../../../../../components';

const DetailsKasirAdmin = ({route}) => {
  const [data, setData] = useState('');
  const [image, setImage] = useState('');
  const {kasirId} = route.params;
  const focused = useIsFocused();

  useEffect(() => {
    handleGetData();
  }, [focused]);

  const handleGetData = () => {
    auth
      .get(baseKasir + kasirId)
      .then(async result => {
        setData(result.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <Column>
          <Text style={styles.label}>Name :</Text>
          <Text style={styles.dataContent}>{data.name ? data.name : ''}</Text>
          <Space Height={15} />
          <Text style={styles.label}>Username :</Text>
          <Text style={styles.dataContent}>
            {data.username ? data.username : ''}
          </Text>
          <Space Height={15} />
          <Text style={styles.label}>Role :</Text>
          <Text style={styles.dataContent}>
            {data.roles ? data.roles.name : data.role}
          </Text>
        </Column>
      </Templates>
    </View>
  );
};

export default DetailsKasirAdmin;

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

  label: {
    fontSize: 18,
  },

  dataContent: {
    backgroundColor: '#f0f0f0',
    color: 'black',
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
  },
});
