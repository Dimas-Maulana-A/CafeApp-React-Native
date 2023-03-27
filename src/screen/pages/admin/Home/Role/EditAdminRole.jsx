import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {baseRole, auth} from '../../../../../utils';
import {Templates, PrimaryButtons, Input, Space} from '../../../../../components';

const EditAdminRole = ({route}) => {
  const {idRole} = route.params;
  const [name, setName] = useState('');
  const focused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    handleGetRole();
  }, [focused]);

  const handleGetRole = () => {
    auth
      .get(baseRole + idRole)
      .then(result => {
        const results = result.data.data;
        setName(results.name);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    auth
      .put(baseRole + idRole, {
        name: name,
      })
      .then(result => {
        alert('data was updated successfully');
        navigation.navigate('AdminRole');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <Input
          Value={name}
          on_Change={tx => setName(tx)}
          placeHolder="Input Role"
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

export default EditAdminRole;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
