import {
  LogBox,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavBottom from '../../components/NavBottom';
import Voice from '@react-native-voice/voice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faMicrophone} from '@fortawesome/free-solid-svg-icons';

LogBox.ignoreLogs(['new NativeEventEmitter()']);

export default function VoiveScreen() {
  const [result, setResult] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = e => {
    console.log('start handler', e);
  };
  const onSpeechEndHandler = e => {
    console.log('stop handler', e);
  };
  const onSpeechResultsHandler = e => {
    let text = e.value[0];
    setResult(text);
    console.log('speech results handler', e);
  };

  const starRecording = async () => {
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error raised ', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop('en-Us');
    } catch (error) {
      console.log('error raised ', error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Syamsudin Assistant</Text>
        <View style={styles.texInputStyle}>
          <TextInput
            style={{flex: 1, color: 'black'}}
            value={result}
            placeholder="your text"
            onChangeText={text => setResult(text)}
            multiline={true}
            numberOfLines={4}
          />

          <TouchableOpacity onPress={() => starRecording()}>
            <FontAwesomeIcon icon={faMicrophone} size={20} />
          </TouchableOpacity>
        </View>
        {/* <TextInput multiline={true} style={{borderWidth:1}} numberOfLines={4} /> */}

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 24,
            backgroundColor: 'red',
            padding: 8,
            borderRadius: 4,
          }}
          onPress={() => stopRecording()}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Stop</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <NavBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  texInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
  viewSamsudin: {
    flex: 1,
    height: 50,
  },
});
