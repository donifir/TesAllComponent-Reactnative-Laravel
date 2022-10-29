import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import NavBottom from '../../../../components/NavBottom';
import NavHeader from '../../../../components/NavHeader';
import {TextInput} from '@react-native-material/core';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createSuplier, editSuplier, getSuplier, resetData, suplierSelectors} from '../../../../features/suplierSlice';
import {useEffect} from 'react';

export default function EditSuplier({ route, navigation }) {
  const [namaSuplier, setNamaSuplier] = useState('');
  const [alamatSuplier, setAlamatSuplier] = useState('');
  const [telpSuplier, setTelpSuplier] = useState('');
  const [errorSubmit, setErrorSubmit] = useState([]);
  

  const { itemId2 } = route.params;
  const dispatch = useDispatch();
  const dataError = useSelector(state => state.suplier.dataError);
  const redirectSuplier = useSelector(state => state.suplier.redirectSuplier);
  const suplier = useSelector(state => suplierSelectors.selectById(state, itemId2)); //cara ambil data dari store

  useEffect(() => {
    if (suplier) {
        setNamaSuplier(suplier.nama_suplier)
        setAlamatSuplier(suplier.alamat_suplier)
        setTelpSuplier(suplier.telp_suplier)
    }
  }, [suplier]);

  useEffect(() => {
    if (redirectSuplier === 'true') {
      navigation.navigate('Home2');
      dispatch(resetData());
    }
  }, [redirectSuplier]);

  useEffect(() => {
    if (dataError) {
      setErrorSubmit(dataError);
    }
  }, [dataError]);

  const submitData = async () => {
    const formData = new FormData();
    formData.append('nama_suplier', namaSuplier);
    formData.append('alamat_suplier', alamatSuplier);
    formData.append('telp_suplier', telpSuplier);

    await dispatch(editSuplier({formData,itemId2}));
  };

  return (
    <View style={styles.container}>
      <NavHeader />
      <View style={styles.wrapperText}>
        <TextInput
          variant="outlined"
          label="Nama Suplier"
          color={'gold'}
          style={styles.textInput}
          value={namaSuplier}
          onChangeText={value => setNamaSuplier(value)}
        />
        <Text style={{color: 'red'}}>{errorSubmit.nama_suplier}</Text>
        {/* {console.log(dataError)} */}

        <TextInput
          variant="outlined"
          label="Alamat Suplier"
          color={'gold'}
          style={styles.textInput}
          value={alamatSuplier}
          onChangeText={value => setAlamatSuplier(value)}
        />
        <Text style={{color: 'red'}}>{errorSubmit.alamat_suplier}</Text>

        <TextInput
          variant="outlined"
          label="Telp Suplier"
          color={'gold'}
          style={styles.textInput}
          value={telpSuplier}
          onChangeText={value => setTelpSuplier(value)}
        />
      </View>
      <Text style={{color: 'red'}}>{errorSubmit.telp_suplier}</Text>

      <View style={styles.button}>
        <TouchableOpacity onPress={submitData}>
          <Text>Submit</Text>
        </TouchableOpacity>
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
  wrapperText: {
    margin: 5,
  },
  textInput: {
    marginTop: 10,
  },
  button: {
    width: '90%',
    backgroundColor: 'gold',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
    borderBottomStartRadius: 10,
    borderTopLeftRadius: 10,
  },
});
