import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBridgeCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import {TextInput} from '@react-native-material/core';
import {useDispatch, useSelector} from 'react-redux';
import {postRegister, resetData} from '../../../features/authSlice';
import NavHeader from '../../../components/NavHeader';

export default function Register({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const postRegisterError = useSelector(state => state.auth.postRegisterError);
  const redirectAuthBasic = useSelector(state => state.auth.redirectAuthBasic);

  const submitEvent = async () => {
    const formData = new FormData();
    formData.append('name', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);

    await dispatch(postRegister(formData));
  };

  useEffect(() => {
    if (postRegisterError.name) {
      Alert.alert('Alert Title', `${postRegisterError.name}`);
    } else if (postRegisterError.email) {
      Alert.alert('Alert Title', `${postRegisterError.email}`);
    } else if (postRegisterError.password) {
      Alert.alert('Alert Title', `${postRegisterError.password}`);
    } else if (postRegisterError.confirm_password) {
      Alert.alert('Alert Title', `${postRegisterError.confirm_password}`);
    }
  }, [postRegisterError]);

  useEffect(() => {
    if (redirectAuthBasic === "true") {
      dispatch(resetData());
      navigation.navigate('Home');
    }
  }, [redirectAuthBasic]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.component}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <FontAwesomeIcon icon={faArrowLeft} size={20} />
          </TouchableOpacity> */}
          <NavHeader/>
          <View style={styles.componentIcon}>
            <FontAwesomeIcon icon={faBridgeCircleCheck} size={50} />
          </View>
        </View>
      </SafeAreaView>
      <ScrollView>
        <TextInput
          variant="outlined"
          label={'username'}
          style={{marginHorizontal: 16, marginVertical: 6, marginTop: 20}}
          value={username}
          color={'gold'}
          onChangeText={value => setUsername(value)}
        />
        <TextInput
          variant="outlined"
          label="Email"
          style={{marginHorizontal: 16, marginVertical: 6}}
          value={email}
          color={'gold'}
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          variant="outlined"
          label="Password"
          style={{marginHorizontal: 16, marginVertical: 6}}
          value={password}
          color={'gold'}
          onChangeText={value => setPassword(value)}
        />
        <TextInput
          variant="outlined"
          label="Confirm Password"
          style={{marginHorizontal: 16, marginVertical: 6}}
          value={confirmPassword}
          color={'gold'}
          onChangeText={value => setConfirmPassword(value)}
        />
        <TouchableOpacity style={styles.touchable} onPress={submitEvent}>
          <Text style={styles.textBtn}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 12,
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
