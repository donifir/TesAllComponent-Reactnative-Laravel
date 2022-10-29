import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArchive,
  faUser,
  faUserAstronaut,
  faUsersViewfinder,
  faVolumeControlPhone,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

export default function NavBottom({Home2}) {
  const navigation = useNavigation();
  return (
    <View style={styles.navigation}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home2')}
        style={styles.navigationItems}>
        <FontAwesomeIcon
          icon={faUserAstronaut}
          size={20}
          // title={`Go to ${Home2}`}
          // onPress={() => navigation.navigate('Home2')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navigationItems}
        onPress={() => navigation.navigate('BarangList')}>
        <FontAwesomeIcon icon={faArchive} size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profil')}
        style={styles.navigationItems}>
        <FontAwesomeIcon icon={faUser} size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navigationItems}
        onPress={() => navigation.navigate('VoiceScreen')}
        >
        <FontAwesomeIcon icon={faVolumeControlPhone} size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navigationItems}
        onPress={() => navigation.navigate('ScanQrCode')}
        >
        <FontAwesomeIcon icon={faArchive} size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
