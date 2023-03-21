import {View, Text} from 'react-native';
import React from 'react';

const Rows = ({children, c_Style, m_Vertical, m_Horizontal}) => {
  return (
    <View
      style={[
        {
          marginVertical: m_Vertical,
          marginHorizontal: m_Horizontal,
          flexDirection: 'row',
        },
        c_Style,
      ]}>
      {children}
    </View>
  );
};

export default Rows;
