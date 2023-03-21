import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const ButtonCardBox = ({
  s_Text,
  e_Text,
  p_Vertical,
  P_Horizontal,
  m_Vertical,
  m_Horizontal,
  start_Component,
  end_Component,
  s_Icons,
  e_Icons,
  c_Style,
  on_Pressed,
}) => {
  return (
    <View
      style={{
        marginVertical: m_Vertical,
        marginHorizontal: m_Horizontal,
        paddingVertical: p_Vertical,
        paddingHorizontal: P_Horizontal,
        backgroundColor: '#fff',
        shadowOffset: {width: 4, height: 4},
        shadowColor: '#000',
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 5,
      }}>
      {start_Component}

      {end_Component}
    </View>
  );
};

export default ButtonCardBox;

const styles = StyleSheet.create({});
