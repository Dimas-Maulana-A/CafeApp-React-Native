import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';

import {Input, PrimaryButtons, Templates, Space} from '../../../../components';
import {getItem, auth, baseKasir} from '../../../../utils';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const ProfileDev = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    getLocal();
  }, [focused]);

  const getLocal = async () => {
    try {
      const data = JSON.parse(await getItem('@storage_data'));
      try {
        if (data !== null) {
          setUserId(data ? data.id : '');
          auth
            .get(baseKasir + `${data.id}`)
            .then(result => {
              const results = result.data ? result.data.data : result.data;
              setName(results ? results.name : '');
              setUsername(results ? results.username : '');
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSubmit = e => {
    e.preventDefault();
    auth
      .patch(baseKasir + `${userId}`, {
        name: name,
        username: username,
      })
      .then(result => {
        navigation.navigate('Developer');
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
          placeHolder="name"
          c_Style={{
            borderRadius: 20,
            fontSize: 18,
            padding: 10,
          }}
        />

        <Space Height={25} />

        <Input
          Value={username}
          on_Change={text => setUsername(text)}
          placeHolder="username"
          c_Style={{
            borderRadius: 20,
            fontSize: 18,
            padding: 10,
          }}
        />

        <Space Height={25} />

        <PrimaryButtons
          title="Save"
          c_Style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
          onPressed={handlerSubmit}
        />

        <Space Height={15} />

        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePasswordDev')}>
          <Text
            style={{
              color: 'black',
            }}>
            Change Password
          </Text>
        </TouchableOpacity>
      </Templates>
    </View>
  );
};

export default ProfileDev;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
