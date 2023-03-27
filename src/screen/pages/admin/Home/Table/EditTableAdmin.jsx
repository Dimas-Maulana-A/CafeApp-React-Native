import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {baseMeja, auth} from '../../../../../utils';
import {Templates, PrimaryButtons, Input, Space} from '../../../../../components';

const EditTableAdmin = ({route}) => {
  const {idTable} = route.params;
  const [nomorMeja, setNomorMeja] = useState('');
  const focused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    handleGetTable();
  }, [focused]);

  const handleGetTable = () => {
    auth
      .get(baseMeja + idTable)
      .then(result => {
        const results = result.data.data;
        setNomorMeja(results.nomor_meja);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    auth
      .put(baseMeja + idTable, {
        nomor_meja: nomorMeja,
      })
      .then(result => {
        alert('data was updated successfully');
        navigation.navigate('TableAdmin');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <Input
          Value={nomorMeja}
          on_Change={tx => setNomorMeja(tx)}
          placeHolder="Input Table"
          c_Style={{
            borderRadius: 20,
            padding: 10,
            fontSize: 18,
          }}
        />
        <Space Height={15} />
        <PrimaryButtons
          title="Save"
          c_Style={{
            fontWeight: 'bold',
            fontSize: 18,
          }}
          onPressed={handleSubmit}
        />
      </Templates>
    </View>
  );
};

export default EditTableAdmin;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
