import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import Avatar from '../../asset/images/1.jpg';
import NavBottom from '../../components/NavBottom';
import {useDispatch, useSelector} from 'react-redux';
import {getSuplier, suplierSelectors} from '../../features/suplierSlice';
import {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

export default function Home2({navigation}) {
  const supliers = useSelector(suplierSelectors.selectAll); //cara ambil data dari store
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuplier());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* {console.log(supliers, 'this data suplier')} */}
      <ImageBackground style={styles.component}>
        {/* <SafeAreaView> */}
        <ScrollView style={styles.wrapper}>
          {/* items */}
          {supliers.map(suplier => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SuplierDetail',{itemId:suplier.id})} key={suplier.id}>
              <View style={styles.componentIcon} >
                <Image source={Avatar} style={styles.avatar} />
                <View style={styles.textList}>
                  <Text style={styles.text}>{suplier.nama_suplier}</Text>
                  <Text style={styles.text}>{suplier.alamat_suplier}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* </SafeAreaView> */}
      </ImageBackground>

      <NavBottom />

      <View style={styles.wrapperBtn}>
        <TouchableOpacity onPress={() => navigation.navigate('SuplierCreate')}>
          <FontAwesomeIcon
            icon={faPlus}
            size={20}
            styles={styles.touchableBack}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  wrapper: {
    flex: 1,
  },
  component: {
    height: '100%',
    padding: 12,
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
  },
  componentIcon: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textList: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gold',
  },
  navigation: {
    backgroundColor: 'gold',
    height: 40,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBtn: {
    width: 50,
    height: 50,
    backgroundColor: 'gold',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    borderRadius: 25,
    marginBottom: 50,
    marginRight: 15,
  },
  text:{
    color:'#171615'
  }
});
