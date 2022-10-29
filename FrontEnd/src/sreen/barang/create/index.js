import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavBottom from '../../../components/NavBottom';
import NavHeader from '../../../components/NavHeader';
import {TextInput} from '@react-native-material/core';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  barangSelectors,
  createBarang,
  getBarang,
} from '../../../features/barangSlice';
import SelectList from 'react-native-dropdown-select-list';
import axios from 'axios';
import {suplierSelectors} from '../../../features/suplierSlice';
import DocumentPicker from 'react-native-document-picker';

export default function BarangCreate({navigation}) {
  const [namaBarang, setNamaBarang] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [suplierId, setSuplierId] = useState('');
  const [selected, setSelected] = React.useState('');
  const [data, setData] = React.useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const [error, setError] = useState('');

  const supliers = useSelector(suplierSelectors.selectAll); //cara ambil data dari store
  const dataError = useSelector(state => state.barang.dataError);
  const redirectBarang = useSelector(state => state.barang.redirectBarang);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBarang());
    // console.log('tes aja');
  }, [dispatch]);

  useEffect(() => {
    if (supliers) {
      let newArray = supliers.map(item => {
        return {key: item.id, value: item.nama_suplier};
      });
      //Set Data Variable
      setData(newArray);
    }
  }, [supliers]);

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const submitEvent = async () => {
    if (!namaBarang) {
      Alert.alert('Error', ' Field Nama Barang Belum Diisi');
    } else if (!harga) {
      Alert.alert('Error', ' Field Harga Belum Diisi');
    } else if (!stok) {
      Alert.alert('Error', 'Field Stok Belum Diisi');
    } else if (!keterangan) {
      Alert.alert('Error', 'Field Keterangan Belum Diisi');
    } else if (!singleFile) {
      Alert.alert('Error', 'Field Gambar Belum Diisi');
    } else if (!suplierId) {
      Alert.alert('Error', 'Field Suplier Belum Diisi');
    } else {
      const fileToUpload = singleFile;
      const formData = new FormData();
      formData.append('nama_barang', namaBarang);
      formData.append('harga', harga);
      formData.append('stok', stok);
      formData.append('keterangan', keterangan);
      formData.append('gambar', fileToUpload[0]);
      formData.append('suplier_id', suplierId);

      await dispatch(createBarang(formData));
      navigation.navigate('BarangList');
    }
  };

  return (
    <View style={styles.container}>
      <NavHeader />
      <View style={styles.wrapperContent}>
        <TextInput
          style={styles.textInput}
          variant="outlined"
          label="Nama Barang"
          color={'gold'}
          value={namaBarang}
          onChangeText={value => setNamaBarang(value)}
        />

        <TextInput
          style={styles.textInput}
          variant="outlined"
          label="Harga"
          color={'gold'}
          value={harga}
          onChangeText={value => setHarga(value)}
          keyboardType={'numeric'}
        />

        <TextInput
          style={styles.textInput}
          variant="outlined"
          label="Stok"
          color={'gold'}
          value={stok}
          keyboardType={'numeric'}
          onChangeText={value => setStok(value)}
        />

        <TextInput
          style={styles.textInput}
          variant="outlined"
          label="Keterangan"
          color={'gold'}
          value={keterangan}
          onChangeText={value => setKeterangan(value)}
        />

        <SelectList
          setSelected={setSelected}
          data={data}
          search={false}
          //   onSelect={() => alert(selected)}
          onSelect={() => setSuplierId(selected)}
          inputStyles={{color: 'black'}}
          dropdownTextStyles={{color: 'black'}}
          // style={{color:'black'}}
        />

        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}>
          <Text style={styles.buttonTextStyle}>Select File</Text>
        </TouchableOpacity>
        {singleFile !== null ? (
          <Text style={styles.buttonTextStyle}>Select File</Text>
        ) : (
          ''
        )}

        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={submitEvent}>
          <Text style={styles.buttonTextStyle}>Submit</Text>
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
  wrapperContent: {
    padding: 10,
  },
  textInput: {
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
