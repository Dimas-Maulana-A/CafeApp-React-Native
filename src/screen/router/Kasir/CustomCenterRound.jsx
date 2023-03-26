import {TouchableOpacity, View, StyleSheet} from 'react-native';

function CustomCenterRound({children, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.ButtonStyle}
      activeOpacity={1}>
      <View style={styles.Icons}>{children}</View>
    </TouchableOpacity>
  );
}

export default CustomCenterRound;

const styles = StyleSheet.create({
  ButtonStyle: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Icons: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2A29CC',
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
});
