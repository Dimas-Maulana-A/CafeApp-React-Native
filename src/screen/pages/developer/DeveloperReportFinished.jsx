import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  
  import {auth} from '../../../utils';
  import {Templates, Column, Rows, Space} from '../../../components';
  import {useIsFocused, useNavigation} from '@react-navigation/native';
  import {baseReport, getItem} from '../../../utils';
  
  const DeveloperReportFinished = () => {
    const [dataReport, setDataReport] = useState([]);
    const focused = useIsFocused();
    const navigation = useNavigation();
  
    useEffect(() => {
      localCheck();
      getDataReport();
    }, [focused]);
  
    const localCheck = async () => {
      try {
        const local = JSON.parse(await getItem('@storage_data'));
        if (local === null) {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const getDataReport = () => {
      auth
        .get(baseReport)
        .then(result => {
          setDataReport(result.data ? result.data.data : result.data);
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
            {dataReport
              .filter(item => item.status === true)
              .map((item, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.95}
                  onPress={() =>
                    navigation.navigate('ReportDetailsDeveloper', {
                      reportId: item.id,
                    })
                  }>
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
  
  export default DeveloperReportFinished;
  
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: '#fff',
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
  