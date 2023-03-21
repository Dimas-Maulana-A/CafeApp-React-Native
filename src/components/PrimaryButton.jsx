import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

const PrimaryButtons = ({
  title,
  c_Style,
  onPressed,
  p_Vertical,
  p_Horizontal,
  m_Vertical,
  m_Horizontal,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressed}
      style={{
        marginVertical: m_Vertical,
        marginHorizontal: m_Horizontal,
      }}>
      <LinearGradient
        colors={['#131466', '#2A29CC']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={[
          {
            paddingVertical: p_Vertical,
            paddingHorizontal: p_Horizontal,
            shadowOffset: {width: 4, height: 4},
            shadowColor: '#000',
            shadowOpacity: 0.9,
            shadowRadius: 2,
            elevation: 5,
          },
          styles.Gradient,
        ]}>
        <Text
          style={[
            {
              color: 'white',
            },
            c_Style,
          ]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PrimaryButtons;

const styles = StyleSheet.create({
  Gradient: {
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
});
