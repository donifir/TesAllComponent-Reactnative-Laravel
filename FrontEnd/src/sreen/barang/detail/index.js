import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import NavBottom from '../../../components/NavBottom';
import NavHeader from '../../../components/NavHeader';
import {useDispatch, useSelector} from 'react-redux';
import {barangSelectors, deleteBarang, resetData} from '../../../features/barangSlice';

export default function BarangDetail({route, navigation}) {
  const {itemId} = route.params;

  const redirectBarang = useSelector(state => state.barang.redirectBarang);
  const barangs = useSelector(state =>
    barangSelectors.selectById(state, itemId),
  );
    const dispatch=useDispatch()
  const deleteBtn =async()=>{
    navigation.navigate('BarangList')
    await dispatch(deleteBarang(itemId))
  }

  // useEffect(() => {
  //  if (redirectBarang) {
  //   navigation.navigate('BarangList')
  //   dispatch(resetData())
  //  }
  // }, [redirectBarang])
  

  return (
    <View style={styles.container}>
      <NavHeader />
      <View style={styles.wrapperContent}>
        <View style={styles.wrapperGambar}>
          <Image
            source={{uri: `http://192.168.91.14:8000/image/${barangs.gambar}`}}
            style={styles.image}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Nama Barang : {barangs.nama_barang}</Text>
          <Text style={styles.text}>Harga : {barangs.harga}</Text>
          <Text style={styles.text}>Stok : {barangs.stok}</Text>
          <Text style={styles.text}>Keterangan :{barangs.keterangan}</Text>
          <Text style={styles.text}>Nama Suplier : {barangs.nama_suplier}</Text>
          <Text style={styles.text}>
            Alamat Suplier : {barangs.alamat_suplier}
          </Text>
          <Text style={styles.text}>Telp Suplier : {barangs.telp_suplier}</Text>
          <Text style={styles.text}>Gambar : {barangs.gambar}</Text>
        </View>
        <View style={styles.wrapperTauchable}>
          <TouchableOpacity
            style={styles.wrapperText}
            onPress={() =>
              navigation.navigate('BarangEdit', {
                itemId: itemId,
              })
            }>
            <Text style={styles.text}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wrapperText}  onPress={() => deleteBtn(barangs.id)}>
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <NavBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  wrapperContent: {
    margin: 10,
    borderWidth: 2,
    height: 400,
    borderRadius: 20,
    borderColor: 'gold',
    position: 'relative',
  },
  content: {
    margin: 10,
  },
  text: {
    color: 'black',
  },
  wrapperTauchable: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
  },
  wrapperText: {
    borderTopColor: 'gold',
    borderTopWidth: 2,
    height: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperGambar: {
    marginTop:10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width: 100, 
    height: 100,
    borderWidth:2,
    borderColor:'gold',
    borderRadius:10,
  }
});
