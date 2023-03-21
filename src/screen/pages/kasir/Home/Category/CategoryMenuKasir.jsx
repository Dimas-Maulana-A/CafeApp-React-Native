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
import {auth, baseCategory} from '../../../../../utils';

const CategoryMenuKasir = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    getCategory();
  }, [focused]);

  const getCategory = async () => {
    auth
      .get(baseCategory)
      .then(result => {
        setData(result.data ? result.data.data : result.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteCategory = (id)=> {
    auth.delete(baseCategory + id)
    .then(result=> {
      alert(result.data.message)
      getCategory()
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
            title="Add Category"
            c_Style={styles.buttonAdd}
            onPressed={() => navigation.navigate('AddCategoryMenuKasir')}
          />
          <Space Height={15} />
          {data.map((item, i) => (
            <View key={i}>
              <Rows c_Style={styles.listCard}>
                <Text style={styles.listCategory}>{item.name}</Text>
                <Rows>
                  <TouchableOpacity onPress={()=> navigation.navigate('EditCategoryMenuKasir', {
                    idCategoryMenu: item.id
                  })}>
                    <Image
                      source={EditLight}
                      resizeMode="contain"
                      style={styles.Images}
                    />
                  </TouchableOpacity>
                  <Space Width={15} />
                  <TouchableOpacity onPress={()=> deleteCategory(item.id)}>
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

export default CategoryMenuKasir;

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

  listCategory: {
    color: '#000',
    fontSize: 20,
  },

  Images: {
    width: 30,
    height: 30,
  },
});
