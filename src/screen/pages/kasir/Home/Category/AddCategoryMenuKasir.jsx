import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import { Input, Templates, PrimaryButtons, Space } from '../../../../../components';
import { auth, baseCategory } from '../../../../../utils';

const AddCategoryMenuKasir = () => {
  const [name, setName] = useState();
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {}, [focused]);

    const handleSubmit = (e)=> {
        e.preventDefault()
        auth.post(baseCategory, {
            name: name
        })
        .then(result=> {
            navigation.navigate('CategoryMenuKasir')
        })
        .catch(err=> {
            console.log(err)
        })
    }

  return (
    <View style={styles.Container}>
      <Templates m_Horizontal={"5%"} m_Vertical={'5%'}>
        <Input Value={name} on_Change={text => setName(text)} c_Style={styles.textInput} placeHolder="Input Category Menu" />
        <Space Height={15} />
        <PrimaryButtons title='Save' onPressed={handleSubmit} c_Style={styles.Buttons} />
      </Templates>
    </View>
  );
};

export default AddCategoryMenuKasir;

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#fff',
        flex: 1
    },
    textInput: {
        fontSize: 18,
        padding: 10,
        borderRadius: 20
    },
    Buttons: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});