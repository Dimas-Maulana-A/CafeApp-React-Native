import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {DeleteLight, EditLight} from '../../../../../assets';
import {
  Templates,
  Column,
  Rows,
  Space,
  PrimaryButtons,
} from '../../../../../components';
import {auth, baseMeja} from '../../../../../utils';

const TableAdmin = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    getTable();
  }, [focused]);

  const getTable = async () => {
    auth
      .get(baseMeja)
      .then(result => {
        setData(result.data ? result.data.data : result.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteTable = (id)=> {
    auth.delete(baseMeja + id)
    .then(result=> {
      alert(result.data.message)
      getTable()
    })
    .catch(err=> {
      if(err.response){
        alert(err.response.data.message)
      }
    })
  }

  return (
    <ScrollView style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <Column>
          <PrimaryButtons
            title="Add Table"
            c_Style={styles.buttonAdd}
            onPressed={() => navigation.navigate('AddTableAdmin')}
          />
          <Space Height={15} />
          {data.map((item, i) => (
            <View key={i}>
              <Rows c_Style={styles.listCard}>
                <Text style={styles.listTable}>{item.nomor_meja.toString().padStart(2, '0')}</Text>
                <Rows>
                  <TouchableOpacity onPress={()=> navigation.navigate('EditTableAdmin', {
                    idTable: item.id
                  })}>
                    <Image
                      source={EditLight}
                      resizeMode="contain"
                      style={styles.Images}
                    />
                  </TouchableOpacity>
                  <Space Width={15} />
                  <TouchableOpacity onPress={()=> deleteTable(item.id)}>
                    <Image
                      source={DeleteLight}
                      resizeMode="contain"
                      style={styles.Images}
                    />
                  </TouchableOpacity>
                </Rows>
              </Rows>
              <Space Height={15} />
            </View>
          ))}
        </Column>
      </Templates>
    </ScrollView>
  );
};

export default TableAdmin;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  buttonAdd: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  listCard: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  listTable: {
    color: '#000',
    fontSize: 20,
  },

  Images: {
    width: 30,
    height: 30,
  },
});
