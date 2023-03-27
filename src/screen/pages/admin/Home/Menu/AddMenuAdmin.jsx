import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {launchCamera} from 'react-native-image-picker';

import {
  Input,
  Templates,
  PrimaryButtons,
  Space,
} from '../../../../../components';
import {auth, baseCategory, baseMenu} from '../../../../../utils';

const AddMenuAdmin = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [catSelect, setCatSelect] = useState('');
  const [images, setImages] = useState();

  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    handlGetCategory();
  }, [focused]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', catSelect);
    formData.append('harga', price);
    formData.append('image', {
      uri: images,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    auth
      .post(baseMenu, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      .then(result => {
        navigation.navigate('MenuKasir');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlGetCategory = () => {
    auth
      .get(baseCategory)
      .then(result => {
        setCategory(result.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const imageOption = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        // path: 'src/assets/images/',
      },
    };
    launchCamera(options, response => {
      console.log('response : ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uriData = response.assets[0];
        const URIs = uriData.uri;
        const source = URIs;
        setImages(source);
      }
    });
  };

  return (
    <View style={styles.Container}>
      <Templates m_Horizontal={'5%'} m_Vertical={'5%'}>
        <Input
          Value={name}
          on_Change={text => setName(text)}
          c_Style={styles.textInput}
          placeHolder="Input Name Menu"
        />
        <Space Height={15} />
        <Input
          Value={description}
          on_Change={text => setDescription(text)}
          c_Style={styles.textInput}
          placeHolder="Input Description Menu"
        />
        <Space Height={15} />
        <View
          style={{
            borderRadius: 20,
            backgroundColor: '#fff',
            shadowOffset: {width: 4, height: 4},
            shadowColor: '#000',
            shadowOpacity: 0.9,
            shadowRadius: 2,
            elevation: 5,
          }}>
          <Picker
            selectedValue={catSelect}
            onValueChange={valueItem => {
              setCatSelect(valueItem);
              console.log(valueItem);
            }}>
            {category.map((item, i) => (
              <Picker.Item value={item.id} label={item.name} key={i} />
            ))}
          </Picker>
        </View>
        <Space Height={15} />
        <Input
          Value={price}
          on_Change={text => setPrice(text)}
          c_Style={styles.textInput}
          placeHolder="Input Price Menu"
        />
        <Space Height={15} />

        <PrimaryButtons
          title="Choose Image"
          onPressed={imageOption}
          c_Style={{
            fontSize: 18,
          }}
        />
        <Space Height={15} />

        <PrimaryButtons
          title="Save"
          onPressed={handleSubmit}
          c_Style={styles.Buttons}
        />
        <Space Height={15} />

        <View>
          <Text
            style={{
              fontSize: 15,
              color: 'silver',
            }}>
            Image Preview :{' '}
          </Text>
          <Space />
          {images ? (
            <Image source={{uri: images}} style={{width: 200, height: 200}} />
          ) : (
            ''
          )}
        </View>
      </Templates>
    </View>
  );
};

export default AddMenuAdmin;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  textInput: {
    fontSize: 18,
    padding: 10,
    borderRadius: 20,
  },
  Buttons: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
