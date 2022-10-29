import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function NavHeader() {
    const navigation = useNavigation();
  return (
    <View>
      <ImageBackground style={styles.component}>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.touchableOpacity}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={20}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
      component: {
        height: 50,
        padding: 12,
        backgroundColor: 'gold',
        borderBottomLeftRadius: 20,
      },
      touchableOpacity:{
        position:'relative',
      },
});
