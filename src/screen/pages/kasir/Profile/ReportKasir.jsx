import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {auth, baseReport, getItem} from '../../../../utils';

import {Input, Space, PrimaryButtons} from '../../../../components';

const ReportKasir = () => {
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const pushReport = async () => {
    const data = JSON.parse(await getItem('@storage_data'));
    auth
      .post(baseReport, {
        id_kasir: data.id ? data.id : '',
        message: message,
      })
      .then(result => {
        alert('Success');
        navigation.navigate('ProfileScreenKasir');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <Input
        Value={message}
        on_Change={text => setMessage(text)}
        placeHolder="message"
        p_Vertical={10}
        p_Horizontal={10}
        c_Style={{
          fontSize: 18,
          borderRadius: 20,
        }}
      />

      <Space Height={20} />

      <PrimaryButtons
        title="Send"
        onPressed={pushReport}
        c_Style={styles.pushReportText}
      />
    </View>
  );
};

export default ReportKasir;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    flex: 1,
    padding: '5%',
  },

  pushReportButton: {
    borderRadius: 25,
    marginVertical: 10,
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  pushReportGradient: {
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },

  pushReportText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
