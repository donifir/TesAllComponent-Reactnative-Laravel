import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faSignOut} from '@fortawesome/free-solid-svg-icons';
import Avatar from '../../asset/images/1.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {postLogout} from '../../features/authSlice';
import NavBottom from '../../components/NavBottom';
// import CekLogin from '../../auth/CekLogin';

export default function Profil({navigation}) {
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.auth.authStatus);
  const redirectAuth = useSelector(state => state.auth.redirectAuth);

  const getData = async () => {
    try {
      const usernames = await AsyncStorage.getItem('username');
      const tokens = await AsyncStorage.getItem('token');
      // console.log('tokens :',tokens);
      setUsername(usernames);

      if (tokens) {
        setUsername(usernames);
      } else {
        setUsername('');
      }
    } catch (e) {
      // error reading value
    }
  };

  const deleteData = async () => {
    await dispatch(postLogout());
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('username');
    } catch (e) {
      // remove error
    }
    console.log('Done.');
  };

  useEffect(() => {
    getData();
  }, [redirectAuth]);

  return (
    <View style={styles.container}>
      {console.log(redirectAuth, 'this redirect aut in profile')}
      <ImageBackground style={styles.component}>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.touchableOpacity}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={20}
              styles={styles.touchableBack}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteData()}
            style={styles.touchableLogout}>
            <FontAwesomeIcon icon={faSignOut} size={20} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.componentIcon}>
          <Image source={Avatar} style={styles.avatar} />
          <Text>{username}</Text>
        </View>
      </ImageBackground>

      <NavBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // position:'relative'
  },
  touchableOpacity: {
    position: 'relative',
  },
  touchableLogout: {
    alignSelf: 'flex-end',
    position: 'absolute',
    flex: 1,
    padding: 2,
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
});
