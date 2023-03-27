import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';

const Modals = ({children, c_Style, animated, trans, visible}) => {
  return (
    <Modal visible={visible} animationType={animated} transparent={trans ? trans : 'true'}>
      <View style={styles.Container}>
        <View style={[styles.Card, c_Style]}>
            {children}
        </View>
      </View>
    </Modal>
  );
};

export default Modals;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
  Card: {
    margin: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
});
