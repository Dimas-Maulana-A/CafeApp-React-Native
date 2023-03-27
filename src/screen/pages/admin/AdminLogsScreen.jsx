import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {auth, baseLogs, getItem} from '../../../utils';
import {Templates, Column, Rows, Space} from '../../../components';

const AdminLogsScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    checkLocal();
    getLogs();
  }, [focused]);

  const checkLocal = async () => {
    try {
      const data = JSON.parse(await getItem('@storage_data'));
      if (data === null) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLogs = () => {
    auth
      .get(baseLogs)
      .then(result => {
        console.log(result.data.data);
        setData(result.data ? result.data.data : result.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <ScrollView>
        <Templates p_Horizontal={'5%'}>
          {data
            .filter(d => d.id_kasir === 3)
            .map((d, i) => {
              let date = new Date(d.createdAt);
              let options = {year: 'numeric', month: 'long', day: 'numeric'};
              let hour = date.getHours();
              let minutes = date.getMinutes();
              return (
                <View key={i}>
                  <Rows
                    c_Style={{
                      justifyContent: 'space-between',
                      borderBottomColor: 'silver',
                      borderBottomWidth: 1,
                    }}>
                    <Column>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        {d.logs ? d.logs.name : d.id_kasir}
                      </Text>
                      <Text>
                        {hour.toString().padStart(2, '0')}.
                        {minutes.toString().padStart(2, '0')} -{' '}
                        {date.toLocaleDateString('en-EN', options)}
                      </Text>
                    </Column>
                    <Text>{d.status}</Text>
                  </Rows>
                  <Space Height={15} />
                </View>
              );
            })}
        </Templates>
        <Space Height={80} />
      </ScrollView>
    </View>
  );
};

export default AdminLogsScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
