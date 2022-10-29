import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetData} from '../../features/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const dispatch = useDispatch();
  const redirectAuth = useSelector(state => state.auth.redirectAuth);
  const postDataLogin = useSelector(state => state.auth.postDataLogin);

  useEffect(() => {
    if (redirectAuth === 'true') {
      setTimeout(() => {
        dispatch(resetData());
      }, 500);
    }
    if (postDataLogin) {
      AsyncStorage.setItem('username', postDataLogin.username);
      AsyncStorage.setItem('token', postDataLogin.token);
    }
  }, [redirectAuth, postDataLogin]);

  return (
    <View style={styles.container}>
      {console.log(postDataLogin.username, 'this username')}
      <Text>SplashScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
