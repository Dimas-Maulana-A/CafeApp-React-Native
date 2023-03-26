import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {auth, baseReport, getItem} from '../../../../utils';
import {Templates, Column, Space} from '../../../../components';

const ReportDetailsAdmin = ({route}) => {
  const [data, setData] = useState('');
  const [reportDate, setReportDate] = useState('')
  const {reportId} = route.params;
  const focused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    localCheck();
    getDataDetails();
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

  const getDataDetails = () => {
    auth
      .get(baseReport + reportId)
      .then(result => {
        setData(result.data ? result.data.data : result.data);
        let date = new Date(result.data.data.tgl_report);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        setReportDate(date.toLocaleDateString('en-EN', options))
        console.log(result.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <Column>
          <Text style={styles.Labels}>Report Name :</Text>
          <Space Height={8} />
          <Text style={styles.boxDetails}>
            {data.id_kasir ? data.reports.name : data.id_kasir}
          </Text>
        </Column>
        <Space Height={20} />
        <Column>
          <Text style={styles.Labels}>Report Message :</Text>
          <Space Height={8} />
          <Text style={styles.boxDetails}>{data.message}</Text>
        </Column>
        <Space Height={20} />
        <Column>
          <Text style={styles.Labels}>Report Status :</Text>
          <Space Height={8} />
          <Text style={styles.boxDetails}>
            {data.status ? 'finished' : 'on process'}
          </Text>
        </Column>
        <Space Height={20} />
        <Column>
          <Text style={styles.Labels}>Report Date :</Text>
          <Space Height={8} />
          <Text style={styles.boxDetails}>
            {reportDate}
          </Text>
        </Column>
      </Templates>
    </View>
  );
};

export default ReportDetailsAdmin;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  Labels: {
    color: 'black',
    fontSize: 18,
  },

  boxDetails: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    fontSize: 18,
    borderRadius: 20,
  },
});
