import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Templates, Column, Rows, Space} from '../../../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {auth, baseReport, getItem} from '../../../utils';

const AdminReportScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    localCheck();
    getReport();
  }, [focused]);

  const localCheck = async () => {
    try {
      const local = JSON.parse(await getItem('@storage_data'));
      if (local === null) {
        navigation.navigate('Login').catch(err => {
          console.log(err);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getReport = () => {
    auth
      .get(baseReport)
      .then(result => {
        setData(result.data ? result.data.data : result.data);
        console.log(result.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <ScrollView>
        <Templates m_Horizontal={'5%'}>
          {data.map((item, i) => (
            <TouchableOpacity key={i} activeOpacity={.95} onPress={()=> navigation.navigate('ReportDetailsAdmin', {
                reportId : item.id
            })}>
              <Rows c_Style={styles.cardBox}>
                <Column c_Style={styles.textMessage}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.message}>
                    {item.message}
                  </Text>
                  <Text>
                    {item.reports ? item.reports.name : item.id_kasir}
                  </Text>
                </Column>
                <Text
                  style={[
                    {
                      color: 'black',
                      fontSize: 12,
                      padding: 5,
                      alignSelf: 'center',
                      borderRadius: 10,
                    },
                    item.status
                      ? {
                          backgroundColor: 'lime',
                        }
                      : {backgroundColor: 'red'},
                  ]}>
                  {item.status ? 'finished' : 'on process'}
                </Text>
              </Rows>
            </TouchableOpacity>
          ))}
        </Templates>
        <Space Height={80} />
      </ScrollView>
    </View>
  );
};

export default AdminReportScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  cardBox: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 20,
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  textMessage: {
    width: '70%',
  },

  message: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
