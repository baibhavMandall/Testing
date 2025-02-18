import { View, Text, Image, Dimensions, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import React from 'react'
import { createStyleSheet } from 'react-native-unistyles'
import { Camera } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

export default function HomeScreen() {

  const { navigate }: any = useNavigation()

  return (
    <SafeAreaView style={styles.container}>

      <Camera size={RFValue(250)} />

      <TouchableOpacity style={styles.button} onPress={() => navigate('DetailsStack')}>
        <Text style={{ fontSize: RFValue(15) }}>Add new sale</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = createStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'ios' ? 0 : 20
  },

  button: { 
    borderRadius: 10,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    paddingHorizontal: 20,
    backgroundColor: '#6CA6CD',
    marginTop: 50,
    width: width / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})