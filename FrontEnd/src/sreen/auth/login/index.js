import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faBridgeCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import {TextInput} from '@react-native-material/core';
import {useDispatch, useSelector} from 'react-redux';
import {postLogin, resetData} from '../../../features/authSlice';
import NavHeader from '../../../components/NavHeader';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //
  const dispatch = useDispatch();
  const postLoginError = useSelector(state => state.auth.postLoginError);

  const submitEvent = async () => {
    // console.log('submit data');
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    await dispatch(postLogin(formData));
  };

  const onpressData = () => {
    dispatch(resetData());
  };

  useEffect(() => {
    if (postLoginError) {
      if (postLoginError.email) {
        Alert.alert('Alert Title', `${postLoginError.email}`);
      } else if (postLoginError.password) {
        Alert.alert('Alert Title', `${postLoginError.password}`);
      } else if (postLoginError === 'invalid credensial') {
        Alert.alert('Alert Title', `${postLoginError}`);
      }
    }
  }, [postLoginError]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.component}>
          <NavHeader />
          {/* <TouchableOpacity onPress={onpressData}>
            <FontAwesomeIcon icon={faArrowLeft} size={20} />
          </TouchableOpacity> */}
          <View style={styles.componentIcon}>
            <FontAwesomeIcon icon={faBridgeCircleCheck} size={50} />
          </View>
        </View>
      </SafeAreaView>
      <TextInput
        variant="outlined"
        label="Email"
        style={{marginHorizontal: 16, marginVertical: 6, marginTop: 20}}
        color={'gold'}
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <TextInput
        secureTextEntry={true}
        variant="outlined"
        label="Password"
        color={'gold'}
        style={{marginHorizontal: 16, marginVertical: 6}}
        value={password}
        onChangeText={value => setPassword(value)}
      />
      <TouchableOpacity style={styles.touchable} onPress={submitEvent}>
        <Text style={styles.textBtn}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  component: {
    height: 200,
    backgroundColor: 'gold',
    borderBottomLeftRadius: 50,
  },
  componentIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    position: 'relative',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gold',
    alignSelf: 'flex-end',
    height: 30,
    borderTopLeftRadius: 10,
  },
  textBtn:{
    color:'black'
  }
});
