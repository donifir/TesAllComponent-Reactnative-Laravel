import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Home2 from '../sreen/home2';
import Profil from '../sreen/profil';
import SuplierCreate from '../sreen/home2/suplier/create';
import SuplierDetail from '../sreen/home2/suplier/detail';
import EditSuplier from '../sreen/home2/suplier/edit';
import BarangList from '../sreen/barang/list';
import BarangCreate from '../sreen/barang/create';
import barangDetail from '../sreen/barang/detail';
import BarangEdit from '../sreen/barang/update';
import Home from '../sreen/Home';
import Register from '../sreen/auth/register';
import Login from '../sreen/auth/login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../sreen/splashScreen';
import VoiveScreen from '../sreen/voice';
import ScanQrCode from '../sreen/scanQrCode';

const Stack = createNativeStackNavigator();

export default function RoutesStack() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const postDataLogout = useSelector(state => state.auth.postDataLogout);
  const postDataLogin = useSelector(state => state.auth.postDataLogin);
  const postDataRegister = useSelector(state => state.auth.postDataRegister);
  const redirectAuth = useSelector(state => state.auth.redirectAuth);

  const getData = async () => {
    try {
      const tokens = await AsyncStorage.getItem('token');
      console.log(tokens, 'this token');
      if (!tokens) {
        setToken('');
        setLoading('false');
      } else {
        setToken(tokens);
        setLoading('false');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [postDataLogin, postDataLogout, redirectAuth]);

  if (redirectAuth === 'true') {
    // We haven't finished checking for the token yet
    // console.log(redirectAuth);
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {!token ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          {/* isLogin */}
          <Stack.Screen
            name="Home2"
            component={Home2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profil"
            component={Profil}
            options={{headerShown: false}}
          />

          {/* suplier create*/}
          <Stack.Screen
            name="SuplierCreate"
            component={SuplierCreate}
            options={{headerShown: false}}
          />

          {/* suplier detail*/}
          <Stack.Screen
            name="SuplierDetail"
            component={SuplierDetail}
            options={{headerShown: false}}
          />

          {/* Edit Suplier*/}
          <Stack.Screen
            name="SuplierEdit"
            component={EditSuplier}
            options={{headerShown: false}}
          />

          {/* BarangList */}
          <Stack.Screen
            name="BarangList"
            component={BarangList}
            options={{headerShown: false}}
          />

          {/* barangCreate */}
          <Stack.Screen
            name="BarangCreate"
            component={BarangCreate}
            options={{headerShown: false}}
          />

          {/* barangDetail */}
          <Stack.Screen
            name="BarangDetail"
            component={barangDetail}
            options={{headerShown: false}}
          />

          {/* barangEdit */}
          <Stack.Screen
            name="BarangEdit"
            component={BarangEdit}
            options={{headerShown: false}}
          />

           {/* voiceScreen */}
           <Stack.Screen
            name="VoiceScreen"
            component={VoiveScreen}
            options={{headerShown: false}}
          />

          {/* scanQrCode */}
          <Stack.Screen
            name="ScanQrCode"
            component={ScanQrCode}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

