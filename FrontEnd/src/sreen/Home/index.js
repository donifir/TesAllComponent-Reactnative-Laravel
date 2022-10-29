import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Ilust from '../../asset/images/illustration.png';
import {useDispatch} from 'react-redux';
import {resetData} from '../../features/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetData());
  }, []);

 const getData = async () => {
    try {
      const tokens = await AsyncStorage.getItem('token');
      console.log(tokens,'this token');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapperCard}>
        <Image source={Ilust} style={styles.image}></Image>
      </View>
      <View>
        <Text style={styles.text}>This Dummy App</Text>
      </View>

      <View style={styles.touchableOpacity}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textBtn}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.touchableOpacity2}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textBtn}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.touchableOpacity2}>
        <TouchableOpacity onPress={getData}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View> */}
{/* 
      <View style={styles.touchableOpacity2}>
        <TouchableOpacity onPress={() => navigation.navigate('Home2')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'gold',
    alignItems: 'center',
  },
  wrapperCard: {
    // flex: 1,
    backgroundColor: 'gold',
    width: '100%',
    height: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
    marginTop: 8,
  },
  touchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    marginTop: 18,
    backgroundColor: 'gold',
    paddingHorizontal: 28,
    paddingVertical: 3,
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'flex-end',
    borderTopStartRadius: 10,
  },
  touchableOpacity2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    marginTop: 18,
    backgroundColor: 'gold',
    paddingHorizontal: 28,
    paddingVertical: 3,
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'flex-start',
    borderBottomEndRadius: 10,
  },
  textBtn:{
    color:'black'
  }
});
