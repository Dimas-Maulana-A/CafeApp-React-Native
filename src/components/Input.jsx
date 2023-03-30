import {View, Text, TextInput} from 'react-native';
import React from 'react';

const Input = ({
  m_Vertical,
  m_Horizontal,
  p_Vertical,
  p_Horizontal,
  placeHolder,
  keyType,
  Value,
  on_Change,
  Secure,
  c_Style,
}) => {

  return (
    <View
      style={{
        marginVertical: m_Vertical,
        marginHorizontal: m_Horizontal,
      }}>
      <TextInput
        value={Value}
        onChangeText={on_Change}
        keyboardType={keyType}
        style={[
          {
            paddingHorizontal: p_Horizontal,
            paddingVertical: p_Vertical,
            backgroundColor: '#fff',
            shadowOffset: {width: 4, height: 4},
            shadowColor: '#000',
            shadowOpacity: 0.9,
            shadowRadius: 2,
            elevation: 5,
          },
          c_Style,
        ]}
        secureTextEntry={Secure}
        placeholder={placeHolder}
      />
    </View>
  );
};

export default Input;
