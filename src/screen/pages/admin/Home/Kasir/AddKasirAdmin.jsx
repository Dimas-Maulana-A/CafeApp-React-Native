import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

import {
  Input,
  Templates,
  PrimaryButtons,
  Space,
} from '../../../../../components';
import {auth, baseRole, baseKasir} from '../../../../../utils';

const AddKasirAdmin = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState([]);
  const [roleSelect, setRoleSelect] = useState('');

  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    handlGetRole();
  }, [focused]);

  const handleSubmit = e => {
    e.preventDefault();
    auth.post(baseKasir, {
      name: name,
      username: username,
      password: password,
      role: roleSelect
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
        setCategory(result.data.data);
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
        <View
          style={{
            borderRadius: 20,
            backgroundColor: '#fff',
            shadowOffset: {width: 4, height: 4},
            shadowColor: '#000',
            shadowOpacity: 0.9,
            shadowRadius: 2,
            elevation: 5,
          }}>
          <Picker
            selectedValue={roleSelect}
            onValueChange={valueItem => {
              setRoleSelect(valueItem);
              console.log(valueItem);
            }}>
            {category.filter((item)=> item.id !== 1).map((item, i) => (
              <Picker.Item value={item.id} label={item.name} key={i} />
            ))}
          </Picker>
        </View>

        <Space Height={15} />

        <PrimaryButtons
          title="Save"
          onPressed={handleSubmit}
          c_Style={styles.Buttons}
        />
      </Templates>
    </View>
  );
};

export default AddKasirAdmin;

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
