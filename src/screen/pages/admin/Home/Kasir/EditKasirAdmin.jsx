import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {
  Input,
  Templates,
  PrimaryButtons,
  Space,
} from '../../../../../components';
import {auth, baseRole, baseKasir} from '../../../../../utils';

const EditKasirAdmin = ({route}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState([]);
  const [roleSelect, setRoleSelect] = useState('');

  const {idKasir} = route.params
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    handlGetRole();
    handleGetAdmin()
  }, [focused]);

  const handleGetAdmin = ()=> {
    auth.get(baseKasir+idKasir)
    .then(result=> {
      const results = result.data ? result.data.data : result.data
      console.log(result.data.data.harga)
      setName(results.name)
      setUsername(results.username)
      setPassword(results.harga.toString())
      // setRoleSelect(results.role)
    })
    .catch(err=> {
      console.log(err)
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    auth.put(baseKasir+ idKasir, {
      name: name,
      username: username,
      password: password,
    })
    .then(result => {
      navigation.navigate('KasirAdmin');
    })
    .catch(err => {
      console.log(err);
    });
  };

  const handlGetRole = () => {
    auth
      .get(baseRole)
      .then(result => {
        setRole(result.data.data);
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
          on_Change={text => setName(text)}
          c_Style={styles.textInput}
          placeHolder="Input Name Kasir"
        />
        <Space Height={15} />
        <Input
          Value={username}
          on_Change={text => setUsername(text)}
          c_Style={styles.textInput}
          placeHolder="Input Username Kasir"
        />
        <Space Height={15} />
        <Input
          Value={password}
          on_Change={text => setPassword(text)}
          c_Style={styles.textInput}
          placeHolder="Input Password"
        />
        <Space Height={15} />

        <PrimaryButtons
          title="Save"
          onPressed={handleSubmit}
          c_Style={styles.Buttons}
        />
        <Space Height={15} />
      </Templates>
    </View>
  );
};

export default EditKasirAdmin;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  textInput: {
    fontSize: 18,
    padding: 10,
    borderRadius: 20,
  },
  Buttons: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
