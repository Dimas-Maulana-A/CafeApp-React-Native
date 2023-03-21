import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {useIsFocused, useNavigation} from '@react-navigation/native';

import {auth, baseLogin, setItem} from '../../utils';

import {loginBackground, passwordHide, passwordShow} from '../../assets';
import PrimaryButtons from '../../components/PrimaryButton';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [secure, setSecure] = useState(true);
  const nav = useNavigation();
  const navigation = Route => nav.navigate(Route);

  const LoginValidate = async e => {
    e.preventDefault();
    if (!username) {
      alert('input username');
    } else if (!password) {
      alert('input password');
    } else {
      try {
        const res = await auth.post(baseLogin, {
          username: username,
          password: password,
        });
        await setItem('@storage_token', res.data.token);
        await setItem('@storage_data', JSON.stringify(res.data.datas));
        setUsername('');
        setPassword('');
        setSecure(true);
        if (res.data.datas.role === 1) {
          navigation('Developer');
        } else if (res.data.datas.role === 2) {
          navigation('Admin');
        } else if (res.data.datas.role === 3) {
          navigation('Kasir');
        }
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
          setTimeout(() => setMessage(''), 3000);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={loginBackground} style={styles.attributTop} />
      <View style={styles.headers}>
        <Text style={styles.headersText}>Sign In</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.inputCheck}>
        <View style={styles.formControl}>
          <View style={styles.formInput}>
            <TextInput
              style={styles.inputText}
              value={username}
              onChangeText={text => setUsername(text)}
              placeholder="username"
            />
          </View>
          <View style={styles.formInput}>
            <TextInput
              style={styles.inputTextPassword}
              secureTextEntry={secure}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="password"
            />
            <TouchableOpacity
              onPress={() => setSecure(!secure)}
              style={styles.eyePassword}>
              <Image
                source={secure ? passwordHide : passwordShow}
                style={styles.eyeImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <PrimaryButtons 
          title="Sign In"
          m_Vertical={20}
          c_Style={{
            fontWeight: 'bold',
            fontSize: 18
          }}
          onPressed={LoginValidate}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },

  attributTop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  headers: {
    alignSelf: 'center',
  },
  headersText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'san-serif',
  },

  message: {
    color: 'red',
    textAlign: 'center',
  },

  inputCheck: {
    paddingHorizontal: 30,
  },

  formControl: {
    marginTop: 30,
  },

  formInput: {
    marginVertical: 13,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    borderRadius: 40,
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  inputText: {
    fontSize: 18,
  },

  inputTextPassword: {
    fontSize: 18,
    width: '90%',
  },

  eyePassword: {
    justifyContent: 'center',
  },

  eyeImage: {
    width: 30,
    tintColor: 'gray',
  },

  CheckBoxPassword: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  textCheck: {
    textAlign: 'center',
    alignSelf: 'center',
  },

  loginButtonGradient: {
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderRadius: 20,
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  loginButton: {
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    width: '100%',
  },

  registerButton: {
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
});
