import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Platform, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';
import { createStyleSheet } from 'react-native-unistyles';
import { Mic, MicOff } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('screen');

const CustomInputWithMic = (props: any) => {

  const inputRef = useRef<TextInput>(null)
  const [ value, setValue ] = useState(String)
  const [ micOn, setMicOn ] = useState(false)
  const [ active, setActive ] = useState(false)

  const [recognizedText, setRecognizedText] = useState('');
  
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResultsHandler = (event: any) => {
    setRecognizedText(event.value[0]);
  };

  const onSpeechErrorHandler = (event: any) => {
    console.error(event.error);
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      inputRef.current?.focus()
      setMicOn(true)
      setActive(true)
    } catch (error) {
      console.error(error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      inputRef.current?.blur()
      setMicOn(false)
      setActive(false)
    } catch (error) {
      console.error(error);
    }
  };

  const checkPlatform = () => {
    if (Platform.OS === 'android') {
      return true
    }
    else {
      return false
    }
  };

  useEffect(() => {
    setValue(recognizedText)
  }, [recognizedText])

  useEffect(() => {
    props.value(value)
  }, [value])

  return (
    <View style={[styles.test, { borderColor: active ? 'blue' : '#000000' }]}>

      <TextInput
      ref={inputRef}
        placeholder="Enter Text"
        style={{ flex: 1, fontSize: RFValue(20) }}
        value={value}
        onChangeText={ setValue }
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />

      {
        micOn 
        ? <MicOff size={RFValue(25)} color={Platform.OS === 'ios' ? 'blue' : '#999999'} onPress={stopListening} disabled={checkPlatform()} /> 
        : <Mic size={RFValue(25)} color={Platform.OS === 'ios' ? '#000000' : '#999999'} onPress={startListening} disabled={checkPlatform()} /> 
      }
    
    </View>
  );
};

export default CustomInputWithMic;

const styles = createStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  test: {
    width: width / 1.2,
    height: '10%',
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});