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
import {auth, baseRole} from '../../../../../utils';

const AdminRole = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    getRoles();
  }, [focused]);

  const getRoles = async () => {
    auth
      .get(baseRole)
      .then(result => {
        setData(result.data ? result.data.data : result.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteRole = id => {
    auth
      .delete(baseRole + id)
      .then(result => {
        alert(result.data.message);
        getRoles();
      })
      .catch(err => {
        if (err.response) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <ScrollView style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <Column>
          <PrimaryButtons
            title="Add Role"
            c_Style={styles.buttonAdd}
            onPressed={() => navigation.navigate('AddAdminRole')}
          />
          <Space Height={15} />
          {data
            .filter(item => item.id !== 1)
            .map((item, i) => (
              <View key={i}>
                <Rows c_Style={styles.listCard}>
                  <Text style={styles.listRole}>{item.name}</Text>
                  <Rows>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditAdminRole', {
                          idRole: item.id,
                        })
                      }>
                      <Image
                        source={EditLight}
                        resizeMode="contain"
                        style={styles.Images}
                      />
                    </TouchableOpacity>
                    <Space Width={15} />
                    <TouchableOpacity onPress={() => deleteRole(item.id)}>
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

export default AdminRole;

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

  listRole: {
    color: '#000',
    fontSize: 20,
  },

  Images: {
    width: 30,
    height: 30,
  },
});
