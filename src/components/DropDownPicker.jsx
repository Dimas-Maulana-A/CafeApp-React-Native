import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useIsFocused} from '@react-navigation/native';

import {auth} from '../utils';

const DropDownPicker = ({base_Api, on_Change, c_Style}) => {
  const [data, setData] = useState([]);
  const focused = useIsFocused();

  useEffect(() => {
    handleGetData();
  }, [focused]);

  const handleGetData = () => {
    auth
      .get(base_Api)
      .then(result => {
        setData(result.data.data);
        console.log(result.data.data)
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={[styles.Container, c_Style]}>
      <Picker onValueChange={on_Change}>
        {data.map((item, i) => {
          <Picker.Item key={i} label={item.name} value={item.id} />;
        })}
      </Picker>
    </View>
  );
};

export default DropDownPicker;

const styles = StyleSheet.create({});
