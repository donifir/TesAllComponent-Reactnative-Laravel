import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import NavBottom from '../../../components/NavBottom';
import Avatar from '../..//../asset/images/1.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {barangSelectors, getBarang} from '../../../features/barangSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

export default function BarangList({navigation}) {
  const barangs = useSelector(barangSelectors.selectAll); //cara ambil data dari store

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBarang());
    // console.log('tes aja');
  }, [dispatch]);

  return (
    <View style={styles.container}>
    <ScrollView>
      {/* {console.log(barangs)} */}
      {barangs.map(barang => (
        <TouchableOpacity key={barang.id} onPress={() => navigation.navigate('BarangDetail',{itemId: barang.id})}>
          <View style={styles.wrapperItem} >
            <View style={styles.wrapperAvatar}>
              <Image source={Avatar} style={styles.avatar} />
            </View>
            <View style={styles.wrapperText}>
              <Text style={styles.text}>{barang.nama_barang}</Text>
              <Text style={styles.text} >{barang.harga}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      </ScrollView>


      <TouchableOpacity
        style={styles.wrapperButton}
        onPress={() => navigation.navigate('BarangCreate')}>
        <FontAwesomeIcon icon={faPlus} size={20} />
      </TouchableOpacity>
      <NavBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  wrapperItem: {
    flexDirection: 'row',
    margin: 10,
  },
  wrapperAvatar: {
    // flex: 1,
    width: 70,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  wrapperText: {
    borderBottomColor: 'gold',
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  wrapperButton: {
    width: 40,
    height: 40,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40 / 2,
    position: 'absolute',
    bottom: 50,
    right: 10,
  },
  text:{
    color:'black'
  }
});
