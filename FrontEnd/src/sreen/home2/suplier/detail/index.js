import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import NavHeader from '../../../../components/NavHeader';
import NavBottom from '../../../../components/NavBottom';
import {
  deleteSuplier,
  resetData,
  suplierSelectors,
} from '../../../../features/suplierSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function SuplierDetail({route, navigation}) {
  const {itemId} = route.params;
  const suplier = useSelector(state =>
    suplierSelectors.selectById(state, itemId),
  ); //cara ambil data dari store
  const redirectSuplier = useSelector(state => state.suplier.redirectSuplier);

  const dispatch = useDispatch();

  const deleteBtn = async id => {
    navigation.navigate('Home2');
    await dispatch(deleteSuplier(id));
    dispatch(resetData());
    Alert.alert('success', 'Data Deleted');
    // alert('haha')
  };

  return (
    <View style={styles.container}>
      <NavHeader />
      <View style={styles.wrapperCard}>
        <View style={styles.card}>
          <View style={styles.wrapperText}>
            <Text style={{marginBottom: 10, color:'black'}} >Detail Suplier</Text>
            <Text style={styles.text}>Suplier Id: {itemId}</Text>
            <Text style={styles.text}>Nama Suplier : {suplier.nama_suplier}</Text>
            <Text style={styles.text}>Alamat Suplier : {suplier.alamat_suplier}</Text>
            <Text style={styles.text}>Telp Suplier : {suplier.telp_suplier}</Text>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={() =>
                navigation.navigate('SuplierEdit', {itemId2: itemId})
              }>
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={() => deleteBtn(suplier.id)}>
              <Text style={styles.text}>Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <NavBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginVertical: 20,
    borderWidth: 2,
    width: '90%',
    borderColor: 'gold',
    borderRadius: 10,
    height: 400,
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  touchableButton: {
    borderTopColor: 'gold',
    borderTopWidth: 2,
    flex: 1,
    justifyContent: 'center',
    height:30,
    alignItems: 'center',
  },
  wrapperText: {
    margin: 5,
  },
  text:{
    color:'#171615'
  }
});
