import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Templates, Input, PrimaryButtons, Space} from '../../../../components';
import {baseKasir, auth, getItem} from '../../../../utils';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const ChangePasswordDev = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [dataId, setDataId] = useState('');
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    getDataLocal();
  }, [focused]);

  const getDataLocal = async () => {
    const data = JSON.parse(await getItem('@storage_data'));
    try {
      if (data !== null) {
        setDataId(data.id);
      }
      else {
        navigation.navigate('Login')
      }
    } catch (error) {
      navigation.navigate('Login')
    }
  };

  const handleSubmit = e => {
    if (!oldPassword) {
      alert('please input old password');
    } else if (!newPassword) {
      alert('please input new password');
    } else if (!confirmPass) {
      alert('please input confirm password');
    } else if (confirmPass !== newPassword) {
      alert('new password and confirm password not same');
    } else {
      e.preventDefault();
      auth
        .post(baseKasir + `${dataId}`, {
          oldpassword: oldPassword,
          newpassword: newPassword,
        })
        .then(result => {
          navigation.navigate('ProfileAdmin');
        })
        .catch(err => {
          if (err.response) {
            alert(err.response.data.message);
          }
        });
    }
  };

  return (
    <View style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <Input
          Value={oldPassword}
          on_Change={text => setOldPassword(text)}
          c_Style={{
            borderRadius: 20,
            fontSize: 18,
            padding: 10,
          }}
          placeHolder="Old Password"
        />
        <Space Height={18} />
        <Input
          Value={newPassword}
          on_Change={text => setNewPassword(text)}
          c_Style={{
            borderRadius: 20,
            fontSize: 18,
            padding: 10,
          }}
          placeHolder="New Password"
        />
        <Space Height={18} />
        <Input
          Value={confirmPass}
          on_Change={text => setConfirmPass(text)}
          c_Style={{
            borderRadius: 20,
            fontSize: 18,
            padding: 10,
          }}
          placeHolder="Confirm New Password"
        />
        <Space Height={18} />

        <PrimaryButtons
          title="Save"
          c_Style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
          onPressed={handleSubmit}
        />
      </Templates>
    </View>
  );
};

export default ChangePasswordDev;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
